import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeatureService } from '@recipebook-mf/services';
import { Feature } from 'shared/services/src/lib/models/feature.model';

@Component({
  selector: 'account-features',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  private featureService = inject(FeatureService);

  private features$ = this.featureService.features$.asReadonly();
  get features() { return this.features$(); }

  featureName = '';
  feature?: Feature;

  addFeature(name: string): void {
    const feature: Feature = {
      name: name,
      flag: false
    }
    this.featureService.addFeature(feature);
  }

  updateFeature(feature: Feature, flag: boolean): void {
    feature.flag = flag;
    this.featureService.updateFeature(feature);
  }

}
