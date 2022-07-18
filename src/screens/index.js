import { Navigation } from '../ui';

import SideMenu from '../components/SideMenu';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import NewUser from './NewUser/NewUser';
import Resetpassword from './Resetpassword/Resetpassword';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import ForgotPasswordwithcode from './ForgotPasswordwithcode/ForgotPasswordwithcode';
import Home from './Home/Home';
import ContactUs from './ContactUs/ContactUs';
import Success from './Success/Success';
import ImgPickerScreen from './ImgPickerScreen/ImgPickerScreen';
import TrainingProvider from './TrainingProvider/TrainingProvider';
import VenuProvider from './VenuProvider/VenuProvider';
import ServiceRequiser from './ServiceRequiser/ServiceRequiser';
import ActiveHome from './ActiveHome/ActiveHome';
import NotApproved from './NotApproved/NotApproved';
import AddVenue from './AddVenue/AddVenue';
import EditProfile from './EditProfile/EditProfile';
import AddtrainProvider from './AddtrainProvider/AddtrainProvider';
import CourseMenu from './CourseMenu/CourseMenu';
import ServerRequesterDetails from './ServerRequesterDetails/ServerRequesterDetails';
import venueProviderDetails from './venueProviderDetails/venueProviderDetails';
import trainerProviderDetails from './trainerProviderDetails/trainerProviderDetails';
import Bank from './Bank/Bank';
import PointWallets from './PointWallets/PointWallets';
import CancelReservation from './CancelReservation/CancelReservation';
import MarkAsComplete from './MarkAsComplete/MarkAsComplete';
import EditProfileData from './EditProfileData/EditProfileData'
import AddCourse from "./AddCourse/AddCourse"
import CourseDetails from "./CourseDetails/CourseDetails"
import DetailsCourse from "./CourseDetails/DetailsCourse"
import CourseHistory from "./CourseDetails/CourseHistory"

import CourseReservation from "./CourseReservation/CourseReservation"
import History from "./History/History"
import Reservation from "./Reservation/Reservation"
import Confirmation from "./Confirmation/Confirmation"
import ViewAllCourses from "./ViewAll/ViewAllCourses"
import ViewAllVenus from "./ViewAll/ViewAllVenus"
import VenueDatails from "./VenueDetailsService/VenueDatails"
import ServiceProfile from "./ServiceProfile/ServiceProfile"






export default function () {
  Navigation.registerScreen('Login', Login);
  Navigation.registerScreen('SignUp', SignUp);
  Navigation.registerScreen('NewUser', NewUser);
  Navigation.registerScreen('Resetpassword', Resetpassword);
  Navigation.registerScreen('ForgetPassword', ForgetPassword);
  Navigation.registerScreen('ForgotPasswordwithcode', ForgotPasswordwithcode);
  Navigation.registerScreen('SideMenu', SideMenu);
  Navigation.registerScreen('Home', Home);
  Navigation.registerScreen('ContactUs', ContactUs);
  Navigation.registerScreen('AddVenue', AddVenue);
  Navigation.registerScreen('EditProfile', EditProfile);
  Navigation.registerScreen('EditProfileData', EditProfileData);
  Navigation.registerScreen('AddCourse', AddCourse);
  Navigation.registerScreen('CourseDetails', CourseDetails);
  Navigation.registerScreen('CourseReservation', CourseReservation);
  Navigation.registerScreen('AddtrainProvider', AddtrainProvider);
  Navigation.registerScreen('CourseMenu', CourseMenu);
  Navigation.registerScreen('trainerProviderDetails', trainerProviderDetails);
  Navigation.registerScreen('venueProviderDetails', venueProviderDetails);
  Navigation.registerScreen('ServerRequesterDetails', ServerRequesterDetails);
  Navigation.registerScreen('Bank', Bank);
  Navigation.registerScreen('PointWallets', PointWallets);
  Navigation.registerScreen('CancelReservation', CancelReservation);
  Navigation.registerScreen('MarkAsComplete', MarkAsComplete);
  Navigation.registerScreen('History', History);
  Navigation.registerScreen('Reservation', Reservation);
  Navigation.registerScreen('DetailsCourse', DetailsCourse);
  Navigation.registerScreen('Confirmation', Confirmation);
  Navigation.registerScreen('ViewAllCourses', ViewAllCourses);
  Navigation.registerScreen('ViewAllVenus', ViewAllVenus);
  Navigation.registerScreen('VenueDatails', VenueDatails);
  Navigation.registerScreen('CourseHistory', CourseHistory);
  Navigation.registerScreen('ServiceProfile', ServiceProfile);

 
  
  Navigation.registerScreen('Success', Success);
  Navigation.registerScreen('ImgPickerScreen', ImgPickerScreen);
  Navigation.registerScreen('TrainingProvider', TrainingProvider);
  Navigation.registerScreen('VenuProvider', VenuProvider);
  Navigation.registerScreen('ServiceRequiser', ServiceRequiser);
  Navigation.registerScreen('ActiveHome', ActiveHome);
  Navigation.registerScreen('NotApproved', NotApproved);
  


}
