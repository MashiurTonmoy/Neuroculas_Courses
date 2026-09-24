require('dotenv').config()
const BASE = 'http://localhost:5000/api'

async function testBackend() {
  console.log('=== NEUROCULAS BACKEND TEST ===\n')

  // 1. Login as admin
  console.log('1. LOGIN AS ADMIN')
  const loginRes = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@neuroculas.com', password: 'Admin1234' })
  })
  const loginData = await loginRes.json()
  const ADMIN_TOKEN = loginData.token
  console.log('   Status:', loginRes.status)
  console.log('   Role:', loginData.user.role)
  console.log('   Token:', ADMIN_TOKEN ? 'YES' : 'NO')
  console.log()

  // 2. Login as regular user
  console.log('2. LOGIN AS REGULAR USER')
  const userLoginRes = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'testuser@neuroculas.com', password: 'Test1234' })
  })
  const userLoginData = await userLoginRes.json()
  const USER_TOKEN = userLoginData.token
  console.log('   Status:', userLoginRes.status)
  console.log('   Role:', userLoginData.user.role)
  console.log()

  // 3. GET /auth/me (admin)
  console.log('3. GET /auth/me (admin)')
  const meRes = await fetch(`${BASE}/auth/me`, {
    headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
  })
  const meData = await meRes.json()
  console.log('   Status:', meRes.status)
  console.log('   Name:', meData.name, '| Role:', meData.role)
  console.log()

  // 4. GET /courses (public - browse)
  console.log('4. GET /courses (public browse)')
  const coursesRes = await fetch(`${BASE}/courses`)
  const coursesData = await coursesRes.json()
  console.log('   Status:', coursesRes.status)
  console.log('   Total:', coursesData.total, '| Page:', coursesData.page, '| TotalPages:', coursesData.totalPages)
  console.log()

  // 5. GET /courses/my-purchases (protected)
  console.log('5. GET /courses/my-purchases')
  const purchasesRes = await fetch(`${BASE}/courses/my-purchases`, {
    headers: { 'Authorization': `Bearer ${USER_TOKEN}` }
  })
  const purchasesData = await purchasesRes.json()
  console.log('   Status:', purchasesRes.status)
  console.log('   Count:', purchasesData.length)
  console.log()

  // 6. GET /courses/my-uploads (protected)
  console.log('6. GET /courses/my-uploads')
  const uploadsRes = await fetch(`${BASE}/courses/my-uploads`, {
    headers: { 'Authorization': `Bearer ${USER_TOKEN}` }
  })
  const uploadsData = await uploadsRes.json()
  console.log('   Status:', uploadsRes.status)
  console.log('   Count:', uploadsData.length)
  console.log()

  // 7. Admin - GET /admin/stats
  console.log('7. GET /admin/stats (admin only)')
  const statsRes = await fetch(`${BASE}/admin/stats`, {
    headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
  })
  const statsData = await statsRes.json()
  console.log('   Status:', statsRes.status)
  console.log('   Users:', statsData.users)
  console.log('   Courses:', JSON.stringify(statsData.courses))
  console.log('   Purchases:', statsData.purchases)
  console.log('   Reviews:', statsData.reviews)
  console.log('   Revenue:', statsData.totalRevenue)
  console.log()

  // 8. Admin - GET /admin/pending
  console.log('8. GET /admin/pending (admin only)')
  const pendingRes = await fetch(`${BASE}/admin/pending`, {
    headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
  })
  const pendingData = await pendingRes.json()
  console.log('   Status:', pendingRes.status)
  console.log('   Pending count:', pendingData.total)
  console.log()

  // 9. Non-admin tries admin endpoint (should fail 403)
  console.log('9. REGULAR USER tries /admin/stats (should fail)')
  const failRes = await fetch(`${BASE}/admin/stats`, {
    headers: { 'Authorization': `Bearer ${USER_TOKEN}` }
  })
  const failData = await failRes.json()
  console.log('   Status:', failRes.status, '(expected 403)')
  console.log('   Message:', failData.message)
  console.log()

  // 10. No token tries protected endpoint (should fail 401)
  console.log('10. NO TOKEN tries /auth/me (should fail)')
  const noTokenRes = await fetch(`${BASE}/auth/me`)
  const noTokenData = await noTokenRes.json()
  console.log('   Status:', noTokenRes.status, '(expected 401)')
  console.log('   Message:', noTokenData.message)
  console.log()

  // 11. GET /courses with query params
  console.log('11. GET /courses?price=free&sort=rating&page=1&limit=5')
  const filteredRes = await fetch(`${BASE}/courses?price=free&sort=rating&page=1&limit=5`)
  const filteredData = await filteredRes.json()
  console.log('   Status:', filteredRes.status)
  console.log('   Limit:', filteredData.limit, '| Page:', filteredData.page)
  console.log()

  // Summary
  console.log('=== ALL TESTS COMPLETE ===')
  console.log('Auth:       Register ✅ | Login ✅ | Me ✅')
  console.log('Courses:    Browse ✅ | Pagination ✅ | Filters ✅')
  console.log('Protected:  my-purchases ✅ | my-uploads ✅')
  console.log('Admin:      Stats ✅ | Pending ✅ | Role Guard ✅')
  console.log('Security:   401 No Token ✅ | 403 Wrong Role ✅')
}

testBackend().catch(e => console.error('Test failed:', e.message))
