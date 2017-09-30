import { Plane, Owner } from './interfaces'
import { PlaneCategory } from './enums';
import { Planes } from './mock-data';

import * as _ from 'lodash';

let Owners: Array<Owner> = [
    {
        name: 'SELF',
        email: 'SELF',
        ownerId: 'O100'
    },{
        name: 'Michael Wilton',
        email: 'Whip@It.net',
        ownerId: 'O101'
    }
]

//get all planes function which returns a plane array
let GetAllPlanes = (): Array<Plane> => Planes;

    //fetch in default param and filter w/ find
let GetFirstAvailablePlane = (planes = GetAllPlanes()): Plane => planes.find(plane => plane.available);

//fetch in return and filter with filter[0]
let GetPlaneById = (id: number): Plane => GetAllPlanes().filter(plane => plane.id === id )[0]

//function  & return syntax
function GetPlanesByCategory (category: PlaneCategory = PlaneCategory.D): Array<Plane> {
    return GetAllPlanes().filter(plane => plane.category === category)
}

//also valid
let LogRepair = function(id: number, reason: string) {
    let plane = GetPlaneById(id);
    plane.needsRepair(reason);
}

//overly complicated overloads with overloaded comment verbosity
function GetPlanesBy (available: boolean): Plane[];
function GetPlanesBy (category: PlaneCategory): Plane[];
function GetPlanesBy(param: any): Array<Plane> {
    let planes = GetAllPlanes();
    //can also filter manually as seen below
    let matchingPlanes: Plane[] = [];
    if(typeof(param) == 'boolean'){
        planes.forEach(plane => {
            if(plane.available === param)
                matchingPlanes.push(plane);
                //can wait until end of loop for return as else loop wont be entered...
        });
    } else {
        return GetAllPlanes().filter(p => p.category = param);
    }
    //this will return empty array if input param is boolean and there are no matches
    //this will return array with all matches for the boolean input
    //this wont be touched if input is not boolean type
    return matchingPlanes;
}

let UpdatePlanePartial = (id:number, property: string, value:any): void=> {
    let plane = Planes[id];
    plane[property] = value;
}

let UpdatePlaneFull = (updatedPlane: Plane): void=> {
    let currentPlane = Planes.indexOf(Planes.find(plane => plane.id == updatedPlane.id));
    Planes[currentPlane] = updatedPlane;
}

let CheckoutPlanesById = (ids: number[]): void => {
    let planes: Array<Plane>= GetAllPlanes();
    let successfulCheckouts: Array<Plane> = [];
    let unsuccessfulCheckouts: Array<Plane> = [];

    ids.forEach(id => {
        let plane = planes.find(p => p.id === id);
        if(plane.available){
            UpdatePlanePartial(id, 'available', false)
            successfulCheckouts.push(plane)
        } else {
            unsuccessfulCheckouts.push(plane)
        }
    });

    let successString = 'The following plane(s) have been checked out'
    let errorString = 'The following plane(s) are unavailable for check out'
    
    successfulCheckouts.forEach(plane => successString += `- (${plane.id}): ${plane.model} `);
    unsuccessfulCheckouts.forEach(plane => errorString += `- (${plane.id}): ${plane.model} `);
    
    if(successfulCheckouts.length)
        console.log(successString);
    if(unsuccessfulCheckouts.length)
        console.log(errorString);
}

console.log(Planes[0].needsRepair('Its Ruined...'))
CheckoutPlanesById([0,1]);
console.log(Planes);
let typingsCheck = _.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });
console.log('typingsCheck: ' + JSON.stringify(typingsCheck));