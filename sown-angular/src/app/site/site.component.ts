import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

type navigationAction = 'next' | 'prev' | 'random';

interface NavElement {
    text: string;
    url: navigationAction;
}

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteComponent implements OnDestroy {
    private routeSub: Subscription;

    public id = 0;

    public minId = 1;
    public maxId = 5382;

    public controls: NavElement[] = [
        {
            text: '« back «',
            url: 'prev'
        },
        {
            text: '? random ?',
            url: 'random'
        },
        {
            text: '» next »',
            url: 'next'
        }
    ];

    constructor(route: ActivatedRoute, private router: Router, private cd: ChangeDetectorRef) {
        this.routeSub = route.params.subscribe(params => this.onChangeRoute(Number(params.id)));
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    private onChangeRoute(newRouteId: number): void {
        if (!newRouteId) {
            this.id = this.getRandomNumber();
        } else {
            this.id = newRouteId;
        }
        this.cd.markForCheck();
    }

    public onInputChange(event: any): void {
        const inputValue = Number(event.srcElement.value);
        this.navigateToId(inputValue);
    }

    private navigateToId(id: number): void {
        if (id <= this.maxId && id >= this.minId) {
            this.router.navigate([`/${id}`]);
        } else {
            this.router.navigate([this.getRandomUrl()]);
        }
    }

    public getNavAction(action: navigationAction): string {
        switch (action) {
            case 'prev':
                return this.getPreviousUrl();
            case 'next':
                return this.getNextUrl();
            case 'random':
                return this.getRandomUrl();
            default:
                console.error('unknown action ', action);
                throw new Error('unknown action ' + action);
        }
    }

    private getRandomNumber(min: number = this.minId, max: number = this.maxId): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    private getPreviousUrl(): string {
        if (this.id > this.minId) {
            return `/${this.id - 1}`;
        }
        return `/${this.maxId}`;
    }

    private getNextUrl(): string {
        if (this.id < this.maxId) {
            return `/${this.id + 1}`;
        }
        return `/${this.minId}`;
    }

    private getRandomUrl(): string {
        const rand = this.getRandomNumber();
        return `/${rand}`;
    }
}
