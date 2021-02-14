import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';

@NgModule({
    declarations: [SiteComponent, VideoplayerComponent],
    imports: [CommonModule, SiteRoutingModule]
})
export class SiteModule {}
