export interface personDetail {
    rNumber: number;
    name: string;
    email: string;
    age: number;
}
export interface deletePerson {
    rNumber: number;
    name: string;
}
export interface personDetails {
    name: string;
    email: string;
    age: string;
}
export interface statefulSet {
    kind: string,
    name: string,
    namespace: string,
    volumes: string,
    pvc: string,
    status: string,
    nodeName: string,
    adjacency: string
}

export interface jivaReplica {
    kind: string,
    name: string,
    namespace: string,
    pvc: string,
    vsm: string,
    nodeName: string,
    status: string,
    openebsjivaversion: string
}
export interface jivaController {
    kind: string,
    name: string,
    namespace: string,
    pvc: string,
    vsm: string,
    nodeName: string,
    status: string,
    openebsjivaversion: string,
    adjacency: string
}

export interface applicationPod {
    kind: string,
    name: string,
    namespace: string,
    nodeName: string,
    status: string,
    dockerImage: string
}
export interface overAllStatus {
    status: string
    statefulSet: [{
        kind: string,
        name: string,
        namespace: string,
        volumes: string,
        pvc: string,
        status: string,
        nodeName: string,
        adjacency: string
    }],
    jivaReplica: [{
        kind: string,
        name: string,
        namespace: string,
        pvc: string,
        vsm: string,
        nodeName: string,
        status: string,
        openebsjivaversion: string
    }],
    jivaController: [{
        kind: string,
        name: string,
        namespace: string,
        pvc: string,
        vsm: string,
        nodeName: string,
        status: string,
        openebsjivaversion: string,
        adjacency: string
    }],
    applicationPod: [{
        kind: string,
        name: string,
        namespace: string,
        nodeName: string,
        status: string,
        dockerImage: string
    }]
}
export interface link{
    id:string,
    x:number,
    y:number
}