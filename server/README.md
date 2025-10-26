# Path of Heroes - Backend Server

Backend server for Path of Heroes multiplayer game. Built with Express.js, TypeScript, and PocketBase.

## 🏗️ Tech Stack

- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **PocketBase** - Real-time database and backend
- **CORS** - Cross-Origin Resource Sharing support

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PocketBase (downloaded separately or installed globally)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Setup Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=3000
POCKETBASE_URL=http://127.0.0.1:8090
NODE_ENV=development
```

### 3. Setup PocketBase

#### Option A: Download PocketBase Binary

1. Download PocketBase from [https://pocketbase.io/docs/](https://pocketbase.io/docs/)
2. Extract the binary to the `server` directory
3. Run PocketBase:

```bash
./pocketbase serve --http=127.0.0.1:8090
```

#### Option B: Use npm script (if PocketBase is in PATH)

```bash
npm run pocketbase
```

### 4. Create Players Collection in PocketBase

The project includes a migration file that will automatically create the players collection when PocketBase starts. The migration is located in `pb_migrations/` directory.

Alternatively, you can manually create the collection:

1. Open PocketBase Admin UI at `http://127.0.0.1:8090/_/`
2. Create an admin account if it's your first time
3. Go to **Collections** → **New Collection**
4. Create a collection named `players` with the following schema:

| Field Name | Type   | Required | Options                    |
|------------|--------|----------|----------------------------|
| username   | Text   | Yes      | Min: 3, Max: 50, Unique   |
| email      | Email  | Yes      | Unique                     |
| level      | Number | No       | Min: 1, Default: 1        |
| experience | Number | No       | Min: 0, Default: 0        |
| status     | Select | No       | Values: online, offline, away |
| lastSeen   | Date   | No       | -                          |

5. Save the collection

### 5. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Health Check

```http
GET /health
```

Returns server status.

### Players API

#### Get All Players

```http
GET /api/players
```

Query parameters:
- `page` (number): Page number for pagination (default: 1)
- `perPage` (number): Items per page (default: 50)
- `status` (string): Filter by status (online/offline/away)
- `search` (string): Search by username

#### Get Player by ID

```http
GET /api/players/:id
```

#### Create New Player

```http
POST /api/players
Content-Type: application/json

{
  "username": "hero123",
  "email": "hero@example.com",
  "level": 1,
  "experience": 0,
  "status": "online"
}
```

#### Update Player

```http
PATCH /api/players/:id
Content-Type: application/json

{
  "level": 5,
  "experience": 1500,
  "status": "online"
}
```

#### Delete Player

```http
DELETE /api/players/:id
```

## 🔧 Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Start PocketBase (if installed globally)
npm run pocketbase
```

## 📁 Project Structure

```
server/
├── src/
│   ├── index.ts              # Main application entry point
│   ├── routes/
│   │   └── players.ts        # Player routes
│   ├── services/
│   │   └── playerService.ts  # PocketBase player service
│   ├── middleware/
│   │   └── errorHandler.ts   # Error handling middleware
│   └── types/
│       └── player.ts         # TypeScript types
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## 🎮 Player Schema

```typescript
interface Player {
  id?: string;
  username: string;
  email: string;
  level: number;
  experience: number;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date | string;
  created?: Date | string;
  updated?: Date | string;
}
```

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:3000/health

# Get all players
curl http://localhost:3000/api/players

# Create a player
curl -X POST http://localhost:3000/api/players \
  -H "Content-Type: application/json" \
  -d '{"username":"testplayer","email":"test@example.com"}'

# Get player by ID
curl http://localhost:3000/api/players/{player_id}

# Update player
curl -X PATCH http://localhost:3000/api/players/{player_id} \
  -H "Content-Type: application/json" \
  -d '{"status":"online","level":2}'

# Delete player
curl -X DELETE http://localhost:3000/api/players/{player_id}
```

## 🔒 Production Considerations

1. **Environment Variables**: Never commit `.env` files
2. **PocketBase Security**: 
   - Set up proper authentication rules in PocketBase
   - Configure CORS settings appropriately
   - Use HTTPS in production
3. **Rate Limiting**: Consider adding rate limiting middleware
4. **Input Validation**: Add comprehensive input validation
5. **Logging**: Implement proper logging for production

## 🐛 Troubleshooting

### PocketBase Connection Error

If you see connection errors:
1. Ensure PocketBase is running on the correct port
2. Check `POCKETBASE_URL` in `.env`
3. Verify the `players` collection exists in PocketBase

### Port Already in Use

Change the `PORT` in `.env` file to an available port.

## 📝 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
