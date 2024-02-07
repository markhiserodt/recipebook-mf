/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'rb-form',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  route = '';
  
  ngOnInit(): void {
    this.route= ((this.activatedRoute as any)._routerState.snapshot.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.route = event.urlAfterRedirects;
      }
    });
  }
}
