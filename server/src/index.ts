import app from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app.listen(PORT, () => {
  console.log(`🚀 Job Application Tracker API running on http://localhost:${PORT}`);
  console.log(`📡 Endpoints available:`);
  console.log(`   - GET    /api/jobs`);
  console.log(`   - POST   /api/jobs`);
  console.log(`   - GET    /api/jobs/:id`);
  console.log(`   - PUT    /api/jobs/:id`);
  console.log(`   - PATCH  /api/jobs/:id/move`);
  console.log(`   - POST   /api/jobs/:id/timelines`);
  console.log(`   - DELETE /api/jobs/:id`);
  console.log(`   - GET    /api/health`);
});
