import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor() { }

    private loading = new BehaviorSubject<boolean>(false);
    private requestCount = 0;


    get isLoading() {
        return this.loading.asObservable();
    }

    public showLoading(): void {
        this.requestCount++;
        this.loading.next(true);
    }

    public hideLoading(): void {
        this.requestCount--;
        if (this.requestCount === 0) {
            this.loading.next(false);
        }
    }

    public showAlert(type: 'success' | 'error' | 'warning' | 'info', message: string, callback?: () => void): void {
        const title = type.charAt(0).toUpperCase() + type.slice(1) + '!';
        const swalOptions: any = {
            title: title,
            html: message,
            icon: type,
            confirmButtonColor: "#198754",
        };

        if (type === 'warning')
            swalOptions.showCancelButton = true;

        Swal.fire(swalOptions).then((res) => {
            if (res.isConfirmed && callback)
          callback();
        });
    }

}
