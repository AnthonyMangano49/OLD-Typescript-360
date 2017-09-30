import { Plane } from "./interfaces";
import { PlaneCategory } from "./enums";
import { TestPlane } from "./classes"

export const Planes: Array<Plane> = [
        new TestPlane(0, 2001, 'Plano', 'P100-X', true),
        new TestPlane(1, 2009, 'Aero', 'Whizz', true, PlaneCategory.B),
        new TestPlane(2, 1962, 'Skyy', 'Flyer', true, undefined, (reason) => {console.log(`Repair Pending approval for: ${reason}`)}),
        {id: 3, year: 1990, make: 'Cesna', model: 'C-7', available: true, category: PlaneCategory.B, ownerID: 'O101'}
];