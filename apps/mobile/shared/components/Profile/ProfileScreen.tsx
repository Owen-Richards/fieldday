import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { authService } from '../../services/auth';

interface User {
  id: string;
  email?: string;
  phone?: string;
  username: string;
  roles: string[];
  profile: {
    firstName?: string;
    lastName?: string;
  };
  reliability?: {
    overall: number;
    attendance: number;
    punctuality: number;
  };
}

interface ProfileScreenProps {
  onLogout: () => void;
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [user, setUser] = useState<User | null>(null);
  const [actAs, setActAs] = useState<'player' | 'parent' | 'organizer'>('player');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      setActAs(authService.getActAs());
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActAsChange = (role: 'player' | 'parent' | 'organizer') => {
    setActAs(role);
    authService.setActAs(role);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load profile</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{user.username}</Text>
          </View>

          {user.email && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
          )}

          {user.phone && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{user.phone}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Text style={styles.label}>Roles</Text>
            <Text style={styles.value}>{user.roles.join(', ')}</Text>
          </View>
        </View>

        {/* Role Selector (if multiple roles) */}
        {user.roles.length > 1 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Active Role</Text>
            <Text style={styles.cardSubtitle}>Choose which role you're currently acting as:</Text>

            <View style={styles.roleButtons}>
              {user.roles.includes('player') && (
                <TouchableOpacity
                  style={[styles.roleButton, actAs === 'player' && styles.roleButtonActive]}
                  onPress={() => handleActAsChange('player')}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      actAs === 'player' && styles.roleButtonTextActive,
                    ]}
                  >
                    Player
                  </Text>
                </TouchableOpacity>
              )}

              {user.roles.includes('parent') && (
                <TouchableOpacity
                  style={[styles.roleButton, actAs === 'parent' && styles.roleButtonActive]}
                  onPress={() => handleActAsChange('parent')}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      actAs === 'parent' && styles.roleButtonTextActive,
                    ]}
                  >
                    Parent
                  </Text>
                </TouchableOpacity>
              )}

              {user.roles.includes('organizer') && (
                <TouchableOpacity
                  style={[styles.roleButton, actAs === 'organizer' && styles.roleButtonActive]}
                  onPress={() => handleActAsChange('organizer')}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      actAs === 'organizer' && styles.roleButtonTextActive,
                    ]}
                  >
                    Organizer
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Reliability Score */}
        {user.reliability && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Reliability Score</Text>
            <View style={styles.reliabilityCard}>
              <Text style={styles.reliabilityScore}>{user.reliability.overall}/100</Text>
              <Text style={styles.reliabilityText}>
                Keep showing up on time to maintain your score!
              </Text>
            </View>
          </View>
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  roleButton: {
    flex: 1,
    minWidth: 100,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#2563eb',
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  roleButtonTextActive: {
    color: '#fff',
  },
  reliabilityCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  reliabilityScore: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  reliabilityText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginTop: 24,
  },
});
