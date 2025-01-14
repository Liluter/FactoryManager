import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, switchMap, map, distinctUntilChanged, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  router: Router = inject(Router)
  route: ActivatedRoute = inject(ActivatedRoute)
  constructor() { }
  currenttUrl$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    switchMap(() => {
      let route = this.route.root;
      while (route.firstChild) {
        route = route.firstChild
      }
      return of(route)
    }),
    tap((r) => console.log('route', r.snapshot.title)),
    map(route => route.snapshot.routeConfig?.path || '/'),
    distinctUntilChanged()
  )
}
