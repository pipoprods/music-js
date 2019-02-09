export class Base {
    id: string;
    name: string;

    constructor() {
    }

    // Prepare object to be sent to client
    // To be overloaded if needed
    // Don't forget to call super.perpareForResponse();
    public perpareForResponse(): Base {
        // Generate URL-encoded id from name
        this.id = encodeURIComponent(this.name);
        return this;
    }
}