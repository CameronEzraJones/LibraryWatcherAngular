import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LibraryListComponent } from './home/library-list/library-list.component';
import { WatchedLibrariesComponent } from './home/watched-libraries/watched-libraries.component';
import { SearchToolComponent } from './home/search-tool/search-tool.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientService } from './service/http-client.service';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { SearchResultsComponent } from './home/search-results/search-results.component';
import { OcticonDirective } from './directives/octicon.directive';
import { ProjectComponent } from './project/project.component';
import { UrlEncoderPipe } from './util/url-encoder.pipe';
import { VersionHistoryListComponent } from './project/version-history-list/version-history-list.component';
import { ListSorterPipe } from './util/list-sorter.pipe';
import { DetailsGuard } from './guards/details.guard';
import { ProjectDependenciesComponent } from './project/project-dependencies/project-dependencies.component';
import { ProjectDependentsComponent } from './project/project-dependents/project-dependents.component';
import { ProjectContributorsComponent } from './project/project-contributors/project-contributors.component';
import { DataTransferService } from './service/data-transfer.service';
import { ProjectDependentsListFilterPipe } from './project/project-dependents/project-dependents-list-filter.pipe';
import { ProjectDependentRepositoriesComponent } from './project/project-dependent-repositories/project-dependent-repositories.component';
import { DependentRepositoriesListFilterPipe } from './project/project-dependent-repositories/dependent-repositories-list-filter.pipe';
import { DependentRepositoriesListSorterPipe } from './project/project-dependent-repositories/dependent-repositories-list-sorter.pipe';
import { HttpInterceptorProviders } from './service/http-interceptors';
import { RequestCache, RequestCacheService } from './service/request-cache.service';

const appRoutes: Routes = [
  {
    path: 'project',
    children: [
      {
        path: ':platform/:name',
        children: [
          {
            path: '',
            component: ProjectComponent,
            children: [
              {
                path: 'version-history',
                component: VersionHistoryListComponent
              },
              {
                path: 'dependencies',
                component: ProjectDependenciesComponent
              },
              {
                path: 'dependents',
                component: ProjectDependentsComponent
              },
              {
                path: 'dependent-repositories',
                component: ProjectDependentRepositoriesComponent
              }
            ],
            resolve: {project: DetailsGuard}
          }
        ]
      }
    ]
  },
  { path: 'home', component: HomePageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LibraryListComponent,
    WatchedLibrariesComponent,
    SearchToolComponent,
    PageNotFoundComponent,
    HomePageComponent,
    SearchResultsComponent,
    OcticonDirective,
    ProjectComponent,
    UrlEncoderPipe,
    VersionHistoryListComponent,
    ListSorterPipe,
    ProjectDependenciesComponent,
    ProjectDependentsComponent,
    ProjectContributorsComponent,
    ProjectDependentsListFilterPipe,
    ProjectDependentRepositoriesComponent,
    DependentRepositoriesListFilterPipe,
    DependentRepositoriesListSorterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    DataTransferService,
    HttpClientService,
    RequestCache,
    RequestCacheService,
    HttpInterceptorProviders,
    DetailsGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
