export class SecurityCheckDto {
    status?: boolean;
    date?: Date;

    constructor(date: Date, status: boolean) {
        this.date = date;
        this.status = status;
    }
}
