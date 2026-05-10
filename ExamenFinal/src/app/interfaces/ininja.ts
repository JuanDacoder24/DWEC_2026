import { INinjaStats } from "./ininja-stats"

export interface INinja {
    id: number
    ninjaName: string
    fullname: string 
    clan: string
    image1: string
    image2: string
    gender: string
    level: string
    naturetype: string
    affiliation: string
    stats: INinjaStats
}
