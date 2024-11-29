import Login from './Pages/Login';
import Register from './Pages/Register';
import ActivityList from './Pages/ActivitiesList';
import ActivityDetail from './Pages/ActivityDetail';
import PromoList from './Pages/PromoList/index.jsx';
import PromoDetail from './Pages/PromoDetail/index.jsx';
import Home from './Pages/Home';
import UserCart from './Pages/user/UserCart';
import UserTransaction from './Pages/user/UserTransaction';
import UserProfile from './Pages/user/UserProfile';
import { Routes, Route } from 'react-router-dom';
import CheckOutCart from './Pages/user/UserCart/CheckOutCart';
import Dashboard from './Pages/Dashboard';
import ActivityDashboard from './Pages/Dashboard/Activity';
import CreateActiviityDashboard from './Pages/Dashboard/Activity/CreateActivity';
import EditActivityDashboard from './Pages/Dashboard/Activity/EditActivity';
import CategoryDashboard from './Pages/Dashboard/Category';
import CreateCategoryDashboard from './Pages/Dashboard/Category/CreateCategory';
import EditCategoryDashboard from './Pages/Dashboard/Category/EditCategory';
import PromoDashboard from './Pages/Dashboard/Promo';
import CreatePromoDashboard from './Pages/Dashboard/Promo/CreatePromo';
import EditPromoDashboard from './Pages/Dashboard/Promo/EditPromo';
import BannerDashboard from './Pages/Dashboard/Bannerboard';
import CreateBannerDashboard from './Pages/Dashboard/Bannerboard/CreateBanner';
import EditBannerDashboard from './Pages/Dashboard/Bannerboard/EditBanner';
import UsersDashboard from './Pages/Dashboard/Userdash';
import EditUserDashboard from './Pages/Dashboard/Userdash/EditUser.jsx';
import TransactionDashboard from './Pages/Dashboard/Transaction/index.jsx';
import EditTransactionDashboard from './Pages/Dashboard/Transaction/EditTransaction/index.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="activityList" element={<ActivityList />} />
        <Route path="activityList/:id" element={<ActivityDetail />} />
        <Route path="promoList" element={<PromoList />} />
        <Route path="promoList/:id" element={<PromoDetail />} />

        {/* Protected User Routes */}
        <Route
          path="user/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="UserCart" element={<UserCart />} />
                <Route path="UserProfile" element={<UserProfile />} />
                <Route path="UserTransaction" element={<UserTransaction />} />
                <Route
                  path="UserCart/CheckOutCart"
                  element={<CheckOutCart />}
                />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="dashboard/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="activity" element={<ActivityDashboard />} />
                <Route
                  path="activity/createActivity"
                  element={<CreateActiviityDashboard />}
                />
                <Route
                  path="activity/editActivity/:id"
                  element={<EditActivityDashboard />}
                />
                <Route path="category" element={<CategoryDashboard />} />
                <Route
                  path="category/createCategory"
                  element={<CreateCategoryDashboard />}
                />
                <Route
                  path="category/editCategory/:id"
                  element={<EditCategoryDashboard />}
                />
                <Route path="promo" element={<PromoDashboard />} />
                <Route
                  path="promo/createPromo"
                  element={<CreatePromoDashboard />}
                />
                <Route
                  path="promo/editPromo/:id"
                  element={<EditPromoDashboard />}
                />
                <Route path="banner" element={<BannerDashboard />} />
                <Route
                  path="banner/createBanner"
                  element={<CreateBannerDashboard />}
                />
                <Route
                  path="banner/editBanner/:id"
                  element={<EditBannerDashboard />}
                />
                <Route path="users" element={<UsersDashboard />} />
                <Route path="users/editUsers" element={<EditUserDashboard />} />
                <Route path="transaction" element={<TransactionDashboard />} />
                <Route
                  path="transaction/editTransaction/:id"
                  element={<EditTransactionDashboard />}
                />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
