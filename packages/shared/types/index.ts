/**
 * Core domain types for the FieldDay platform
 * These types are shared across all applications and services
 *
 * @packageDocumentation
 */

// ============= User & Identity =============

/**
 * User roles determine access levels and capabilities within the platform
 */
export type UserRole = 'player' | 'organizer' | 'parent' | 'facility' | 'admin';

/**
 * Core user entity representing all platform users
 */
export interface User {
  id: string;
  email: string;
  username: string;
  roles: UserRole[];
  profile: UserProfile;
  reliability: ReliabilityScore;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date; // Soft delete
}

/**
 * User profile information
 */
export interface UserProfile {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  phone?: string;
  avatar?: string; // S3 URL
  bio?: string;
  sports: SportProfile[];
  location: GeoLocation;
  preferences: UserPreferences;
}

/**
 * User preferences for notifications, privacy, etc.
 */
export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  distanceUnit: 'miles' | 'kilometers';
  temperatureUnit: 'fahrenheit' | 'celsius';
  privacyLevel: 'public' | 'friends' | 'private';
}

/**
 * Sport-specific profile for a user
 */
export interface SportProfile {
  sportId: string;
  skillLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  yearsExperience: number;
  certifications?: string[];
  gear?: string[];
}

/**
 * Reliability score tracking user behavior
 */
export interface ReliabilityScore {
  overall: number; // 0-100
  attendance: number; // % of sessions attended
  punctuality: number; // % on-time arrivals
  cancellations: number; // Number of last-minute cancellations
  lastUpdated: Date;
  badges: Badge[];
}

/**
 * Achievement badges earned by users
 */
export type Badge =
  | 'no-flake' // 95%+ attendance
  | 'safety-first' // No incidents, all safety protocols
  | 'coach-verified' // Certified by a coach
  | 'cold-water' // Water activities <55°F
  | 'first-responder' // First aid certified
  | 'background-checked' // Background check completed
  | 'community-leader' // High organizer rating
  | 'early-bird'; // Consistently early

// ============= Sessions & Activities =============

/**
 * Types of sessions available on the platform
 */
export type SessionType =
  | 'pickup' // One-off pickup game
  | 'league' // League fixture
  | 'clinic' // Training/coaching session
  | 'ladder' // Ladder match
  | 'boat' // Boat-based activity
  | 'tournament'; // Tournament event

/**
 * Session status lifecycle
 */
export type SessionStatus =
  | 'draft' // Being created
  | 'published' // Published, accepting registrations
  | 'filling' // Min capacity reached
  | 'confirmed' // Full or confirmed
  | 'in_progress' // Currently happening
  | 'completed' // Finished successfully
  | 'cancelled'; // Cancelled

/**
 * Core session entity
 */
export interface Session {
  id: string;
  type: SessionType;
  sport: Sport;
  title: string;
  description: string;
  venue: Venue;
  organizer: User;
  startTime: Date;
  endTime: Date;
  capacity: SessionCapacity;
  pricing: SessionPricing;
  requirements: SessionRequirements;
  conditions?: ConditionRequirements;
  status: SessionStatus;
  registrations: Registration[];
  waitlist: WaitlistEntry[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

/**
 * Session capacity configuration
 */
export interface SessionCapacity {
  min: number;
  max: number;
  current: number;
}

/**
 * Pricing configuration for a session
 */
export interface SessionPricing {
  amount: number; // In cents
  currency: string;
  deposit?: number;
  refundPolicy: RefundPolicy;
  siblingDiscount?: number;
  earlyBirdDiscount?: number;
  earlyBirdDeadline?: Date;
}

/**
 * Refund policy
 */
export interface RefundPolicy {
  type: 'full' | 'partial' | 'none';
  cutoffHours: number;
  partialPercentage?: number;
}

/**
 * Requirements for joining a session
 */
export interface SessionRequirements {
  ageMin?: number;
  ageMax?: number;
  skillMin?: number;
  skillMax?: number;
  genderMix?: 'any' | 'balanced' | 'separate';
  reliabilityMin?: number;
  gear?: string[];
  certifications?: string[];
  backgroundCheck?: boolean;
  insurance?: boolean;
}

/**
 * User registration for a session
 */
export interface Registration {
  id: string;
  session: Session;
  user: User;
  status: 'registered' | 'checked_in' | 'no_show' | 'cancelled';
  transaction?: Transaction;
  registeredAt: Date;
  checkedInAt?: Date;
  cancelledAt?: Date;
}

/**
 * Waitlist entry
 */
export interface WaitlistEntry {
  id: string;
  session: Session;
  user: User;
  position: number;
  addedAt: Date;
  notified: boolean;
}

// ============= Sports =============

/**
 * Sport definition
 */
export interface Sport {
  id: string;
  name: string;
  category: SportCategory;
  icon: string;
  requiresConditions: boolean;
  typicalDuration: number;
  minPlayers: number;
  maxPlayers: number;
}

/**
 * Sport categories
 */
export type SportCategory = 'team' | 'racquet' | 'water' | 'individual' | 'combat' | 'fitness';

// ============= Conditions (Water/Weather) =============

/**
 * Condition requirements for a session
 */
export interface ConditionRequirements {
  windMin?: number;
  windMax?: number;
  windDirection?: WindDirection[];
  swellMin?: number;
  swellMax?: number;
  tideWindow?: TideWindow;
  visibility?: number;
  temperature?: TemperatureRange;
  precipitation?: 'none' | 'light' | 'any';
}

/**
 * Wind/swell directions
 */
export type WindDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

/**
 * Tide window
 */
export interface TideWindow {
  phase: 'high' | 'low' | 'rising' | 'falling' | 'any';
  heightMin?: number;
  heightMax?: number;
}

/**
 * Temperature range
 */
export interface TemperatureRange {
  min: number;
  max: number;
}

/**
 * Current conditions
 */
export interface CurrentConditions {
  timestamp: Date;
  location: GeoLocation;
  wind: WindData;
  swell?: SwellData;
  tide?: TideData;
  visibility: number;
  temperature: TemperatureData;
  precipitation: number;
  alerts: SafetyAlert[];
}

export interface WindData {
  speed: number;
  direction: WindDirection;
  gusts: number;
}

export interface SwellData {
  height: number;
  period: number;
  direction: WindDirection;
}

export interface TideData {
  current: number;
  direction: 'rising' | 'falling';
  next: { time: Date; height: number; type: 'high' | 'low' };
}

export interface TemperatureData {
  air: number;
  water?: number;
  feelsLike: number;
}

export interface SafetyAlert {
  type:
    | 'small_craft_advisory'
    | 'gale_warning'
    | 'storm_warning'
    | 'tsunami'
    | 'rip_current'
    | 'heat_advisory'
    | 'other';
  severity: 'minor' | 'moderate' | 'severe';
  message: string;
  issuedAt: Date;
  expiresAt?: Date;
}

// ============= Family & Youth =============

/**
 * Family group
 */
export interface Family {
  id: string;
  guardians: User[];
  children: Child[];
  preferences: FamilyPreferences;
  medicalInfo?: MedicalInfo[];
  emergencyContacts: EmergencyContact[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FamilyPreferences {
  autoShareCalendar: boolean;
  requireCarpoolApproval: boolean;
  mediaConsentRequired: boolean;
  allowTeamMessaging: boolean;
}

/**
 * Child entity
 */
export interface Child {
  id: string;
  familyId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  medicalInfo?: MedicalInfo;
  teams: Team[];
  activities: Session[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalInfo {
  allergies: string[];
  medications: string[];
  conditions: string[];
  bloodType?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  lastUpdated: Date;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  alternatePhone?: string;
  email?: string;
}

/**
 * Carpool coordination
 */
export interface Carpool {
  id: string;
  session: Session;
  driver: User;
  riders: Child[];
  seats: number;
  pickupTime: Date;
  pickupLocation: GeoLocation;
  dropoffLocation?: GeoLocation;
  qrCode?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  auditLog: AuditEntry[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditEntry {
  timestamp: Date;
  action: string;
  performedBy: User;
  metadata?: Record<string, any>;
}

export interface Team {
  id: string;
  name: string;
  sport: Sport;
  ageGroup?: string;
  season?: string;
  coaches: User[];
  players: User[];
  guardians?: User[];
  schedule: Session[];
  createdAt: Date;
  updatedAt: Date;
}

// ============= Payments & Transactions =============

export interface Transaction {
  id: string;
  type: 'deposit' | 'payment' | 'refund' | 'payout';
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  user: User;
  session?: Session;
  stripeId?: string;
  stripeStatus?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  completedAt?: Date;
  failureReason?: string;
}

// ============= Facilities & Venues =============

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  location: GeoLocation;
  address: Address;
  facilities: Facility[];
  amenities: string[];
  rules?: string;
  manager?: User;
  hours: OpeningHours[];
  pricing: VenuePricing;
  createdAt: Date;
  updatedAt: Date;
}

export type VenueType = 'public' | 'private' | 'school' | 'club' | 'beach' | 'park';

export interface Facility {
  id: string;
  venueId: string;
  name: string;
  type: 'court' | 'field' | 'rink' | 'pool' | 'beach' | 'ramp' | 'gym';
  capacity: number;
  dimensions?: string;
  surface?: string;
  lights?: boolean;
  covered?: boolean;
  availability: AvailabilitySlot[];
}

export interface AvailabilitySlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  price?: number;
  recurring: boolean;
  blackoutDates?: Date[];
}

export interface OpeningHours {
  dayOfWeek: number;
  open: string;
  close: string;
}

export interface VenuePricing {
  hourlyRate?: number;
  dayRate?: number;
  memberRate?: number;
  deposit?: number;
}

// ============= Safety & Compliance =============

export interface Incident {
  id: string;
  session: Session;
  reportedBy: User;
  involved: User[];
  type: 'injury' | 'behavior' | 'equipment' | 'weather' | 'other';
  severity: 'minor' | 'moderate' | 'severe';
  description: string;
  actions: string[];
  returnToPlay?: ReturnToPlay;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface ReturnToPlay {
  cleared: boolean;
  clearedBy?: User;
  clearedAt?: Date;
  restrictions?: string[];
  followUpRequired: boolean;
  followUpDate?: Date;
}

export interface FloatPlan {
  id: string;
  session: Session;
  submittedBy: User;
  participants: User[];
  route?: GeoLocation[];
  expectedReturn: Date;
  emergencyContact: EmergencyContact;
  vhfChannel?: number;
  equipment: string[];
  checkInInterval?: number;
  status: 'active' | 'completed' | 'overdue' | 'emergency';
  checkIns: CheckIn[];
  createdAt: Date;
}

export interface CheckIn {
  timestamp: Date;
  location: GeoLocation;
  status: 'ok' | 'issue' | 'emergency';
  message?: string;
}

export interface BackgroundCheck {
  id: string;
  user: User;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  checkDate: Date;
  expiryDate: Date;
  provider: string;
  documentUrl?: string;
}

// ============= Messaging =============

export interface Conversation {
  id: string;
  type: 'direct' | 'team' | 'session' | 'club';
  participants: User[];
  guardianVisible: boolean;
  session?: Session;
  team?: Team;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: User;
  content: string;
  attachments?: Attachment[];
  sentAt: Date;
  readBy: User[];
  deletedAt?: Date;
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'document';
  url: string;
  filename: string;
  size: number;
  guardianApproved?: boolean;
}

// ============= Helper Types =============

export interface GeoLocation {
  latitude: number;
  longitude: number;
  geohash?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: {
    timestamp: number;
    version: string;
    requestId: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, any>;
}

export interface SessionFilter {
  location: GeoLocation;
  radius: number;
  sport?: string;
  timeWindow?: TimeWindow;
  skillLevel?: number;
  priceMax?: number;
  reliabilityMin?: number;
  sessionType?: SessionType[];
}

export interface TimeWindow {
  start: Date;
  end: Date;
}

// Legacy exports for backward compatibility
export type Activity = Session;
export type FamilyMember = Child;
export type Event = Session;
