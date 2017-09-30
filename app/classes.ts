//now access the interfaces with dot syntax
import * as I from "./interfaces";
import { ClientTier, PlaneCategory } from "./enums";

//Abstract cant be instantiated, only used as a base
abstract class Nonsense {
    constructor(public reason: string= "I'm just here so I dont get fined") {
        //the same as ctor (reason: string){this.reaso = reason} public reason: string...
    }
    static ImOnlyAvailableToTheClassNotToInstancesOfTheClass = "prefix only with class name"
    modifier = "public access modifier is default (except in ctor)";
    private imOnlyAvailableInsideTheClass = "consumers or subclasses cant see me";
    protected availableInsideClassAndSubClasses = "but not instances..."

    get getterSetter() : any {
        return `Here I can return just about anything, like: ${this.imOnlyAvailableInsideTheClass}`;
    }

    set getterSetter(value: any){
        this.imOnlyAvailableInsideTheClass = 'whatever I want';
    }

    imA() {
        console.log('Method')
    }

    abstract cantImplementInParentButRequiredInChild(): void;
}

// generic with constraint (only types which implement I.RepairTracker will work here)
class Loco <T extends I.RepairTracker> extends Nonsense{
    constructor(input: string, generic: T) {
        //super refers to parent (nonsense)
        //need to satusfy that ctor here (super)
        //If no ctor defined in the loco class, we would pass params when instantiating -> new loco(param)
        super(input);
        generic('input');
    }

    imA() {
        super.imA();
        console.log('method that also calls a super method of the same name (method in the parent/super class)')
    }

    cantImplementInParentButRequiredInChild(): void {
        console.log(`abstract methods cant provide implementation details
        but the child which extends parent class must implement method and provide details `);
    }
}

let classExpressionSyntax = class extends Nonsense {
    cantImplementInParentButRequiredInChild(): void {
        console.log('still need this')
    }

}

class IndividualClient implements I.Client {
    clientId: string;
    clientTier: ClientTier = ClientTier.gold;
    name: string;
    email: string;
    phone?: string;
}

class CorporateClient implements I.Client {
    clientId: string;
    clientTier: ClientTier = ClientTier.platinum;
    name: string;
    email: string;
    phone?: string;
}


export class TestPlane implements I.Plane {
    //available only to class, not instances
    static description = "Planes owned by the company for testing purposes";
    constructor(
        public id: number, 
        public year: number, 
        public make: string, 
        public model: string,
        public available: boolean,
        //use undefined to skip optional params
        category?: PlaneCategory,
        needsRepair?: I.RepairTracker
    ) {
        if(category)
            this.category = category;
        if(needsRepair)
            this.needsRepair = needsRepair;
    }
    category: PlaneCategory = PlaneCategory.A;
    needsRepair: I.RepairTracker = (reason: string) => {console.log(`Repair approved for reason: ${reason}`)};
    ownerID: string = 'O100';
}