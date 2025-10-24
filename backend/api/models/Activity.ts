export interface Activity {
    id: string;
    name: string;
    description: string;
    date: Date;
    location: string;
    organizerId: string;
    participants: string[];
}

export class ActivityModel {
    constructor(private activity: Activity) {}

    getActivityDetails() {
        return this.activity;
    }

    updateActivity(updatedActivity: Partial<Activity>) {
        this.activity = { ...this.activity, ...updatedActivity };
    }
}