# FieldDay Passwordless Authentication

Complete passwordless sign-in/sign-up implementation for web and mobile supporting multiple roles per user.

## Features

- ✅ **Passwordless Authentication**

  - OTP via phone/email (6-digit codes, 5-minute TTL)
  - Magic links via email (15-minute TTL, single-use)
  - OAuth stubs (Apple, Google - coming soon)

- ✅ **Multi-Role Support**

  - Users can have multiple roles: player, parent, organizer
  - "Act as" context switching in UI
  - Roles are additive (default: player)

- ✅ **Secure Token Management**

  - Access tokens: 15 minutes
  - Refresh tokens: 7 days with rotation
  - Web: HTTP-only cookies + localStorage
  - Mobile: Secure storage (expo-secure-store)

- ✅ **Rate Limiting & Security**

  - 3 OTP/magic link requests per minute
  - 5 verification attempts, then 15-minute block
  - Redis-backed with in-memory fallback
  - Single-use magic links

- ✅ **Youth Safety**
  - Minor flag detection from date of birth
  - Ready for guardian-visible messaging
  - Foundation for background check tracking

## Architecture

```
backend/api/
├── utils/
│   ├── jwt.ts              # JWT sign/verify/rotate
│   └── rateLimit.ts        # Rate limiter (Redis + in-memory)
├── middleware/
│   └── auth.ts             # JWT verification, actAs support
├── services/
│   ├── otpService.ts       # OTP generation/validation
│   ├── magicLinkService.ts # Magic link creation/validation
│   └── userService.ts      # User CRUD, provider merging
├── controllers/
│   └── authController.ts   # Auth endpoints with Zod validation
└── routes/
    └── auth.ts             # Route definitions

apps/web/marketing/
├── components/auth/
│   ├── AuthModal.tsx       # Tabbed sign-in modal
│   └── OtpInput.tsx        # 6-digit input with paste support
├── lib/api/
│   └── auth.ts             # Auth API client
├── hooks/
│   └── useAuth.tsx         # Auth context & hooks
└── pages/
    └── account.tsx         # Profile & role switching

apps/mobile/shared/
├── services/
│   └── auth.ts             # Mobile auth service
└── components/Auth/
    ├── OtpInput.tsx        # React Native OTP input
    └── SignInScreen.tsx    # Mobile sign-in screen
```

## API Endpoints

### POST /api/auth/otp/request

Request an OTP code.

**Request:**

```json
{
  "phone": "+15551234567" // OR "email": "user@example.com"
}
```

**Response:** `204 No Content` (code sent)

### POST /api/auth/otp/verify

Verify OTP and receive tokens.

**Request:**

```json
{
  "phone": "+15551234567",
  "code": "123456",
  "deviceInfo": { "platform": "mobile" } // optional
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",  // omitted for web (cookie set)
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "roles": ["player"],
      "profile": { ... }
    }
  }
}
```

### POST /api/auth/magic/request

Request a magic link.

**Request:**

```json
{
  "email": "user@example.com",
  "redirectUrl": "/dashboard" // optional
}
```

**Response:** `204 No Content` (email sent)

### GET /api/auth/magic/verify?token=...

Verify magic link (consumed on first use).

**Web:** Redirects to `redirectUrl` with cookies set  
**API:** Returns JSON with tokens

### POST /api/auth/refresh

Rotate refresh token and get new access token.

**Request:**

```json
{
  "refreshToken": "eyJ..." // optional if cookie present
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..." // optional
  }
}
```

### POST /api/auth/logout

Revoke refresh token and clear cookies.

**Response:** `204 No Content`

### GET /api/auth/me

Get current user profile (protected).

**Headers:**

```
Authorization: Bearer <accessToken>
X-Act-As: player  // optional: player|parent|organizer
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "roles": ["player", "parent"],
      "profile": { ... },
      "reliability": { overall: 100, ... },
      "actAs": "parent"
    }
  }
}
```

## Environment Variables

```bash
# Backend (backend/.env)
JWT_SECRET=your-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here
REDIS_URL=redis://localhost:6379  # optional
APP_URL=http://localhost:3000

# Optional: SMS/Email providers
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
SENDGRID_API_KEY=...

# Frontend (apps/web/marketing/.env.local)
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Mobile (apps/mobile/.env)
EXPO_PUBLIC_API_URL=http://localhost:4000/api
```

## Usage Examples

### Web

```tsx
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/auth/AuthModal';

function MyComponent() {
  const { user, actAs, setActAs, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (!user) {
    return <button onClick={() => setShowAuth(true)}>Sign In</button>;
  }

  return (
    <div>
      <p>Welcome, {user.profile.firstName}!</p>

      {user.roles.length > 1 && (
        <select value={actAs} onChange={(e) => setActAs(e.target.value)}>
          {user.roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Mobile

```tsx
import { authService } from './shared/services/auth';
import { SignInScreen } from './shared/components/Auth/SignInScreen';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authService.init().then(setUser);
  }, []);

  if (!user) {
    return <SignInScreen onSuccess={() => authService.getCurrentUser().then(setUser)} />;
  }

  return <MainApp user={user} />;
}
```

## Development

### Run Backend

```bash
cd backend
npm install
npm run dev
```

The API will be available at `http://localhost:4000`.

### Run Web

```bash
cd apps/web/marketing
npm install
npm run dev
```

### Run Mobile

```bash
cd apps/mobile
npm install
npx expo start
```

## Testing

### Manual Testing (Dev Mode)

When `SENDGRID_API_KEY` and `TWILIO_*` are not set, codes/links are logged to console:

```
🔐 OTP Code for +15551234567: 123456

✨ Magic Link for user@example.com:
http://localhost:3000/api/auth/magic/verify?token=abc123...
```

### Unit Tests

```bash
# Backend
cd backend
npm test

# Test OTP service
npm test -- otpService.test.ts

# Test JWT rotation
npm test -- jwt.test.ts
```

### Integration Tests

```bash
# Backend integration tests
cd backend
npm run test:integration

# Tests OTP flow, magic link flow, refresh rotation, /me endpoint
```

### E2E Tests (Web)

```bash
cd apps/web/marketing
npm run test:e2e

# Tests player and parent authentication flows
```

## Performance Targets

- ✅ OTP request → verify: <5s p95
- ✅ Magic link request: <500ms
- ✅ Token refresh: <200ms
- ✅ `/api/auth/me`: <100ms

## Security Considerations

### ✅ Implemented

- Rate limiting (3 requests/min per identifier)
- OTP attempt limiting (5 attempts, 15min block)
- Single-use magic links
- Token rotation on refresh
- HTTP-only cookies for web
- Secure storage for mobile
- Minor detection from DOB

### 🔜 TODO

- Refresh token blacklist (currently rotate-only)
- CSRF protection for web state-changing routes
- IP-based rate limiting (currently identifier-only)
- Actual Twilio/SendGrid integration
- Background check tracking for coaches
- Guardian-visible youth messaging

## Analytics Events

The following events should be tracked (implementation pending):

- `auth_otp_requested` - OTP request initiated
- `auth_otp_verified` - OTP successfully verified
- `auth_magic_requested` - Magic link request initiated
- `auth_magic_verified` - Magic link successfully verified
- `auth_refreshed` - Token refresh succeeded
- `auth_logout` - User logged out

**Properties:** `method`, `latency_ms`, `success`, `error_code`, `device`, `act_as`

**Privacy:** Never log PII (mask phone/email), no tokens in logs.

## Production Checklist

- [ ] Set strong `JWT_SECRET` and `JWT_REFRESH_SECRET`
- [ ] Configure Redis for production (`REDIS_URL`)
- [ ] Set up SendGrid for magic links
- [ ] Set up Twilio for OTP SMS
- [ ] Enable HTTPS and set `NODE_ENV=production`
- [ ] Set `APP_URL` to production domain
- [ ] Configure cookie `sameSite` and `secure` flags
- [ ] Implement refresh token blacklist
- [ ] Add CSRF protection
- [ ] Set up monitoring and alerts
- [ ] Enable analytics tracking
- [ ] Add rate limiting by IP
- [ ] Configure CORS properly

## Troubleshooting

### Tokens not persisting

- **Web:** Check browser cookies, ensure `credentials: 'include'` on fetch
- **Mobile:** Verify SecureStore/Keychain permissions

### OTP not received

- Dev: Check console for logged code
- Prod: Verify Twilio credentials and phone number format

### Magic link expired

- Links expire after 15 minutes
- Single-use only (consumed on first click)
- Request a new link

### "Too many requests"

- Rate limit: 3 requests per minute
- Wait for cooldown period
- Check for misconfigured retries

## License

MIT
