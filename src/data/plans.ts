import { PlanDisplayData } from '@/models/plan'

export const PLANS: { [key: string]: PlanDisplayData} = {
    "free": {
        links: [
            {text: "Station Info", link: "https://avwx.docs.apiary.io/#reference/0/station"},
            {text: "Station Search", link: "https://avwx.docs.apiary.io/#reference/0/station-search"},
            {text: "Nearest Stations", link: "https://avwx.docs.apiary.io/#reference/0/nearest-stations"},
            {text: "METAR", link: "https://avwx.docs.apiary.io/#reference/0/metar"},
            {text: "TAF", link: "https://avwx.docs.apiary.io/#reference/0/taf"},
        ],
    },
    "pro": {
        preface: "All Hobby features +",
        links: [
            {text: "PIREP", link: "https://avwx.docs.apiary.io/#reference/0/pirep"},
            {text: "AIR / SIGMET", link: "https://avwx.docs.apiary.io/#reference/0/airsigmet"},
            {text: "NBM", link: "https://avwx.docs.apiary.io/#reference/0/nbm"},
            {text: "GFS", link: "https://avwx.docs.apiary.io/#reference/0/gfs"},
            {text: "Multiple Reports", link: "https://avwx.docs.apiary.io/#reference/0/multiple-reports"},
            {text: "Nearest Reports", link: "https://avwx.docs.apiary.io/#reference/0/nearest-reports"},
            {text: "Report Search", link: "https://avwx.docs.apiary.io/#reference/0/report-search"},
        ],
    },
    "enterprise": {
        preface: "All Pro features +",
        links: [
            {text: "Flight Routing", link: "https://avwx.docs.apiary.io/#reference/0/report-routing"},
            {text: "Historic Reports", link: "https://avwxhistory.docs.apiary.io"},
            {text: "Priority Support"},
        ],
    },
}