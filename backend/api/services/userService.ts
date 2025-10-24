import { v4 as uuidv4 } from 'uuid';

interface CreateUserInput {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  provider?: 'email' | 'phone' | 'google' | 'apple';
  providerId?: string;
}

interface User {
  id: string;
  email?: string;
  phone?: string;
  username: string;
  roles: string[];
  profile: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    phone?: string;
    avatar?: string;
    bio?: string;
    sports?: any[];
    location?: any;
    preferences?: any;
  };
  reliability: {
    overall: number;
    attendance: number;
    punctuality: number;
    cancellations: number;
    lastUpdated: Date;
    badges: string[];
  };
  isMinor?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory user store for now (replace with actual DB later)
const userStore = new Map<string, User>();
const emailIndex = new Map<string, string>();
const phoneIndex = new Map<string, string>();
const providerIndex = new Map<string, string>(); // `${provider}:${providerId}` -> userId

export class UserService {
  async findOrCreateUser(input: CreateUserInput): Promise<User> {
    // Try to find existing user
    let user = await this.findUserByIdentifier(input.email || input.phone || '');

    if (user) {
      // Merge provider if new
      if (input.provider && input.providerId) {
        await this.linkProvider(user.id, input.provider, input.providerId);
      }
      return user;
    }

    // Check if provider account exists
    if (input.provider && input.providerId) {
      const providerKey = `${input.provider}:${input.providerId}`;
      const existingUserId = providerIndex.get(providerKey);
      if (existingUserId) {
        const existingUser = userStore.get(existingUserId);
        if (existingUser) {
          return existingUser;
        }
      }
    }

    // Create new user
    const userId = uuidv4();
    const isMinor = input.dateOfBirth ? this.isMinor(input.dateOfBirth) : false;

    const newUser: User = {
      id: userId,
      email: input.email,
      phone: input.phone,
      username: this.generateUsername(input.email || input.phone || userId),
      roles: ['player'], // Default role
      profile: {
        firstName: input.firstName,
        lastName: input.lastName,
        dateOfBirth: input.dateOfBirth,
        phone: input.phone,
        sports: [],
        preferences: {},
      },
      reliability: {
        overall: 100, // Start with perfect score
        attendance: 0,
        punctuality: 0,
        cancellations: 0,
        lastUpdated: new Date(),
        badges: [],
      },
      isMinor,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to store
    await this.saveUser(newUser);

    // Link provider if specified
    if (input.provider && input.providerId) {
      await this.linkProvider(userId, input.provider, input.providerId);
    }

    return newUser;
  }

  async findUserByIdentifier(identifier: string): Promise<User | null> {
    // Check if email or phone
    const isEmail = identifier.includes('@');

    const userId = isEmail ? emailIndex.get(identifier) : phoneIndex.get(identifier);
    if (!userId) return null;

    return userStore.get(userId) || null;
  }

  async findUserById(id: string): Promise<User | null> {
    return userStore.get(id) || null;
  }

  async updateUserRoles(userId: string, roles: string[]): Promise<void> {
    const user = userStore.get(userId);
    if (!user) throw new Error('User not found');

    user.roles = roles;
    user.updatedAt = new Date();
    userStore.set(userId, user);
  }

  async addRole(userId: string, role: string): Promise<void> {
    const user = await this.findUserById(userId);
    if (!user) throw new Error('User not found');

    const roles = user.roles || [];
    if (!roles.includes(role)) {
      roles.push(role);
      await this.updateUserRoles(userId, roles);
    }
  }

  private async saveUser(user: User): Promise<void> {
    userStore.set(user.id, user);

    if (user.email) {
      emailIndex.set(user.email, user.id);
    }
    if (user.phone) {
      phoneIndex.set(user.phone, user.id);
    }
  }

  private async linkProvider(userId: string, provider: string, providerId: string): Promise<void> {
    const providerKey = `${provider}:${providerId}`;
    providerIndex.set(providerKey, userId);
  }

  private generateUsername(identifier: string): string {
    const base = identifier.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    const suffix = Math.random().toString(36).substring(2, 6);
    return `${base}${suffix}`.toLowerCase();
  }

  private isMinor(dateOfBirth: Date): boolean {
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      return age - 1 < 18;
    }

    return age < 18;
  }
}

export const userService = new UserService();
