import { Routes } from '@angular/router';
import { AdGunsComponent } from './ad-guns/ad-guns.component';
import { AdSupplementarysComponent } from './ad-supplementarys/ad-supplementarys.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadComponent } from './upload/upload.component';
import { PurchaseComponent } from './purchase/purchase.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'guns', component: AdGunsComponent},
    {path: 'supplementarys', component: AdSupplementarysComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent},
    { path: 'ad-guns/:id', component: AdGunsComponent },
    { path: 'ad-supplementarys/:id', component: AdSupplementarysComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'purchase', component: PurchaseComponent }
];
