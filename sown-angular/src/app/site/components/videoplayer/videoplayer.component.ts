import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

declare var RufflePlayer: any;

@Component({
    selector: 'app-videoplayer',
    templateUrl: './videoplayer.component.html',
    styleUrls: ['./videoplayer.component.scss']
})
export class VideoplayerComponent implements AfterViewInit {
    private ruffle: any;
    private player: any;
    private pVideoId = 0;

    private localFilePath = 'assets/swf/';

    private ruffleConfig = {
        autoplay: 'true',
        unmuteOverlay: 'visible',
        publicPath: undefined,
        polyfills: true
    };

    @Input()
    public set videoId(id: number) {
        this.pVideoId = id;
        this.updateCurrentVideo();
    }

    @ViewChild('flashContainer')
    public flashContainer?: ElementRef;

    constructor() {}

    ngAfterViewInit(): void {
        this.loadRuffle();
    }

    private loadRuffle(): void {
        this.ruffle = RufflePlayer.newest();
        this.player = this.ruffle.createPlayer();
        this.player.config = this.ruffleConfig;
        this.flashContainer?.nativeElement.appendChild(this.player);
        this.updateCurrentVideo();
    }

    private updateCurrentVideo(): void {
        const videoWithSuffix = `${this.pVideoId}.swf`;
        const fullVideoPath = this.localFilePath + videoWithSuffix;
        this.playVideo(fullVideoPath);
    }

    private playVideo(video: string): void {
        this.player?.load(video).then(() => {
            console.log('then');
        });
    }
}
