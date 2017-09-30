import { ClientTier, PlaneCategory } from "./enums";

interface Plane {
    id: number;
    year: number,
    make: string,
    model: string,
    available: boolean;
    category: PlaneCategory
    needsRepair?: RepairTracker;
    ownerID: string;
}

interface RepairTracker {
    (reason: string): void;
}

interface Person {
    name: string;
    email: string;
    phone?: string;
}

interface Owner extends Person {
    ownerId: string;
}

interface Client extends Person {
    clientId: string;
    clientTier: ClientTier;
}

export {Plane, RepairTracker, Owner, Client}