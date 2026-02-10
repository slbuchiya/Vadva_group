const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Storage for settings (In-memory for mock)
let settings = {
    upiId: 'mock@upi',
    qrImage: '',
    bgImage: ''
};

// Mock Data for Users
let users = [
    {
        "_id": "1",
        "fullName": "Sanjay Hiralal Buchiya",
        "tshirtName": "SANJU",
        "size": "L",
        "mobile": "7069803539",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "2",
        "fullName": "Buchiya vishal k",
        "tshirtName": "Vishal",
        "size": "XXL",
        "mobile": "7990704762",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "3",
        "fullName": "Vinay lalji buchiya",
        "tshirtName": "Vinay buchiya",
        "size": "L",
        "mobile": "8141368022",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "4",
        "fullName": "બુચિયા પ્રવીણ લખમશી",
        "tshirtName": "Pravin",
        "size": "M",
        "mobile": "6353007755",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "5",
        "fullName": "PRAKASH",
        "tshirtName": "PRAKASH",
        "size": "M",
        "mobile": "7567709787",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "6",
        "fullName": "Buchiya Anil Govindbhai",
        "tshirtName": "ANIL",
        "size": "XL",
        "mobile": "9687323586",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "7",
        "fullName": "Buchiya mukesh thavar bhai",
        "tshirtName": "MukeshSinh",
        "size": "L",
        "mobile": "9879388594",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "8",
        "fullName": "Buchiya navin Jamnadash",
        "tshirtName": "N J",
        "size": "M",
        "mobile": "7359896867",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "9",
        "fullName": "Buchiya Chetan Devji",
        "tshirtName": "C D",
        "size": "L",
        "mobile": "7567449927",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "10",
        "fullName": "PRAYAAN",
        "tshirtName": "PRAYAAN (Nanu balak chhe number -12)",
        "size": "S/30",
        "mobile": "8980401868",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "11",
        "fullName": "Prakash Premji",
        "tshirtName": "PBHURO",
        "size": "M",
        "mobile": "8980401868",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "12",
        "fullName": "Anil Devshi Buchiya",
        "tshirtName": "ANNU",
        "size": "L",
        "mobile": "9327393257",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "13",
        "fullName": "Buchiya karan shivji bhai",
        "tshirtName": "Karan",
        "size": "L",
        "mobile": "9316652472",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "14",
        "fullName": "Buchiya Prakash Lalji",
        "tshirtName": "Prakash",
        "size": "M",
        "mobile": "8347976694",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "15",
        "fullName": "Buchiya Rohit velji bhai",
        "tshirtName": "Rohit",
        "size": "M",
        "mobile": "9978737170",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "16",
        "fullName": "Buchiya kantilal khimji",
        "tshirtName": "KANTI",
        "size": "XXL",
        "mobile": "9979058886",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "17",
        "fullName": "Buchiya Tushar Dhanji",
        "tshirtName": "Tushar Buchiya",
        "size": "XXL",
        "mobile": "6354070001",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "18",
        "fullName": "Buchiya Hiren",
        "tshirtName": "H_K_MARU_",
        "size": "XL",
        "mobile": "9909718757",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "19",
        "fullName": "SAGAR BUCHIYA",
        "tshirtName": "SAGAR",
        "size": "M",
        "mobile": "7046621656",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "20",
        "fullName": "BUCHIYA BHARAT DAYLAL",
        "tshirtName": "Bharat",
        "size": "XL",
        "mobile": "7069575666",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "21",
        "fullName": "BUCHIYA SAGAR DEVSHI",
        "tshirtName": "SAGAR",
        "size": "M",
        "mobile": "6354389393",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "22",
        "fullName": "BUCHIYA HARDIK",
        "tshirtName": "HARDIK",
        "size": "M",
        "mobile": "6354389393",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "23",
        "fullName": "BUCHIYA NAVIN DEVSHI",
        "tshirtName": "NAVIN",
        "size": "XL",
        "mobile": "6354389393",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "24",
        "fullName": "Meet Buchiya",
        "tshirtName": "Meet",
        "size": "L",
        "mobile": "9327058065",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "25",
        "fullName": "Buchiya badal ravilal",
        "tshirtName": "Badal",
        "size": "XL",
        "mobile": "9328516771",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "26",
        "fullName": "Buchiya viram manji bhai",
        "tshirtName": "Viram",
        "size": "XXL",
        "mobile": "8140733268",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "27",
        "fullName": "Chetan c buchiya",
        "tshirtName": "Chetan",
        "size": "M",
        "mobile": "7203834740",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "28",
        "fullName": "buchiya bhavesh kanji",
        "tshirtName": "BK",
        "size": "L",
        "mobile": "6351640401",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "29",
        "fullName": "BUCHIYA BHAVESH GOVIND",
        "tshirtName": "BHAVESH",
        "size": "L",
        "mobile": "9687485932",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "30",
        "fullName": "Buchiya Bhavik kantilal",
        "tshirtName": "Bhavik",
        "size": "S",
        "mobile": "9537041322",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "31",
        "fullName": "MukeshKumar Sayabhai Buchiya",
        "tshirtName": "શ્રી",
        "size": "XXL",
        "mobile": "9978397716",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "32",
        "fullName": "Buchiya Nikhil Rajesh",
        "tshirtName": "NIKHU",
        "size": "L",
        "mobile": "8160994172",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "33",
        "fullName": "Buchiya vishal parsotambhai",
        "tshirtName": "V. P",
        "size": "L",
        "mobile": "9328934270",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "34",
        "fullName": "Buchiya bipin.R",
        "tshirtName": "BIPIN",
        "size": "M",
        "mobile": "9904012845",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "35",
        "fullName": "Buchiya mansukh bhimjibhai",
        "tshirtName": "THE MB",
        "size": "L",
        "mobile": "7567448167",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "36",
        "fullName": "BUCHIYA SURESH KARAMSHI",
        "tshirtName": "SURESH",
        "size": "L",
        "mobile": "9913033537",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "37",
        "fullName": "BUCHIYA TARUN SURESH K",
        "tshirtName": "TARUN",
        "size": "S/32",
        "mobile": "9913033537",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "38",
        "fullName": "Shaan maru",
        "tshirtName": "Shaan maru",
        "size": "M",
        "mobile": "9023958874",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "39",
        "fullName": "Vipul Khimji Buchiya",
        "tshirtName": "Vipul",
        "size": "XL",
        "mobile": "8238560760",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "40",
        "fullName": "Buchiya krishna vipul",
        "tshirtName": "Krishna",
        "size": "XL",
        "mobile": "8238560760",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "41",
        "fullName": "Buchiya prakash dayalal",
        "tshirtName": "Prakash",
        "size": "XL",
        "mobile": "9054198090",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "42",
        "fullName": "Buchiya prath kumar ramesh     .26 .no tshirt",
        "tshirtName": "Prath",
        "size": "S/26",
        "mobile": "9054198090",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "43",
        "fullName": "BUCHIYA SACHIN LAKHAMSHI",
        "tshirtName": "SACHIN",
        "size": "M/36",
        "mobile": "9099490428",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "44",
        "fullName": "Buchiya shanti lakha",
        "tshirtName": "S.L",
        "size": "M",
        "mobile": "8141561163",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "45",
        "fullName": "Buchiya darshan n",
        "tshirtName": "Darshan",
        "size": "L",
        "mobile": "9510602519",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "46",
        "fullName": "BUCHIYA SURESH KARSHAN",
        "tshirtName": "SURESH",
        "size": "XXXL",
        "mobile": "9979063360",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "47",
        "fullName": "Buchiya Prince Naranbhai",
        "tshirtName": "Prince",
        "size": "L",
        "mobile": "9913842186",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "48",
        "fullName": "Buchiya vishal lalji",
        "tshirtName": "Vishal",
        "size": "M",
        "mobile": "7984454856",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "49",
        "fullName": "BUCHIYA KANTILAL",
        "tshirtName": "Kanti..",
        "size": "XL",
        "mobile": "9979058886",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "50",
        "fullName": "Buchiya Ram",
        "tshirtName": "Ram",
        "size": "M",
        "mobile": "8141387839",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "51",
        "fullName": "Buchiya parsotambhai veljibhai",
        "tshirtName": "P. V",
        "size": "XXL",
        "mobile": "9913838797",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "52",
        "fullName": "BUCHIYA AJAY DAYALAL",
        "tshirtName": "AJAY",
        "size": "XXXL",
        "mobile": "9023034981",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "53",
        "fullName": "BUCHIYA JAYESH DAYALAL",
        "tshirtName": "JAYESH",
        "size": "L",
        "mobile": "8238761910",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "54",
        "fullName": "Kudecha chetan devji bhai",
        "tshirtName": "Chetan",
        "size": "XXL",
        "mobile": "9687929755",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "55",
        "fullName": "Buchiya Bharat Magan",
        "tshirtName": "B.M",
        "size": "L",
        "mobile": "8980397768",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "56",
        "fullName": "Buchiya Shanti Magan",
        "tshirtName": "S.M",
        "size": "XL",
        "mobile": "9316390728",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "57",
        "fullName": "Jitendra thavar bhai buchiya",
        "tshirtName": "Jitendra",
        "size": "XXL",
        "mobile": "9726536348",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "58",
        "fullName": "Haresh thavar bhai buchiya",
        "tshirtName": "Haresh",
        "size": "XXL",
        "mobile": "8799275593",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "59",
        "fullName": "Hitesh thavar bhai buchiya",
        "tshirtName": "Hitesh",
        "size": "XL",
        "mobile": "87992755993",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "60",
        "fullName": "BUCHIYA DHANJI BHAI THAVAR",
        "tshirtName": "DHANJI",
        "size": "XXL",
        "mobile": "9687502283",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "61",
        "fullName": "Ravi Jerambhai Buchiya",
        "tshirtName": "Ravi",
        "size": "XL",
        "mobile": "7574064694",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "62",
        "fullName": "Buchiya Kaushik kanji",
        "tshirtName": "Kaushik",
        "size": "XS/34",
        "mobile": "8238379783",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "63",
        "fullName": "Buchiya meet kanji",
        "tshirtName": "Meet",
        "size": "XS/34",
        "mobile": "8238379783",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "64",
        "fullName": "MAHESH KHIMJI BUCHIYA",
        "tshirtName": "M B",
        "size": "XL",
        "mobile": "8238560760",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "65",
        "fullName": "Buchiya nitin l",
        "tshirtName": "Nitin",
        "size": "M",
        "mobile": "9327582593",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "66",
        "fullName": "Gopal magan buchiya",
        "tshirtName": "G M  BUCHIYA",
        "size": "XXL",
        "mobile": "7984231053",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "67",
        "fullName": "Buchiya dev l",
        "tshirtName": "Dev",
        "size": "XL",
        "mobile": "9016972682",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "68",
        "fullName": "Buchiya dipak khimji",
        "tshirtName": "Dipak",
        "size": "XXL",
        "mobile": "9265420381",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "69",
        "fullName": "Buchiya Rupesh Ravij bhai",
        "tshirtName": "Rupshii",
        "size": "XL",
        "mobile": "9727144848",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "70",
        "fullName": "Odhana vinay devjibhai",
        "tshirtName": "Vinay",
        "size": "L",
        "mobile": "8200715150",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "71",
        "fullName": "Buchiya chetan lakhamshi",
        "tshirtName": "Chetan.L",
        "size": "L",
        "mobile": "9327825889",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "72",
        "fullName": "BHARAT",
        "tshirtName": "BHARAT",
        "size": "L",
        "mobile": "8141733350",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "73",
        "fullName": "NARSHI SUMARBHAI BUCHIYA",
        "tshirtName": "N S BUCHIYA",
        "size": "XL",
        "mobile": "9081331411",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "74",
        "fullName": "Lalji Khimji Buchiya",
        "tshirtName": "Lalji K B",
        "size": "M",
        "mobile": "8469720020",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "75",
        "fullName": "Odhana dhruv laljibhai",
        "tshirtName": "Dhruv",
        "size": "L",
        "mobile": "9727580591",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "76",
        "fullName": "Hitesh Arvindbhai Buchiya",
        "tshirtName": "H B",
        "size": "XXL",
        "mobile": "6359964525",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "77",
        "fullName": "Buchiya Lakhan Jamnadash",
        "tshirtName": "Lakhan",
        "size": "M",
        "mobile": "7359896867",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "78",
        "fullName": "Buchiya Mitesh Aravind",
        "tshirtName": "Meet Maru",
        "size": "XL",
        "mobile": "9512358700",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "79",
        "fullName": "Buchiya kanti nanji",
        "tshirtName": "MR BUCHIYA",
        "size": "XL",
        "mobile": "8154013482",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "80",
        "fullName": "BUCHIYA RIYANSH MOHAN",
        "tshirtName": "RIYANSH",
        "size": "S/28",
        "mobile": "9099490428",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "81",
        "fullName": "Buchiya Raj kanji bhai",
        "tshirtName": "Raju",
        "size": "M",
        "mobile": "9601709617",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "82",
        "fullName": "Buchiya akash kanji bhai",
        "tshirtName": "Akash",
        "size": "M",
        "mobile": "9825634652",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "83",
        "fullName": "Buchiya shanti chapshi",
        "tshirtName": "S.C.MARU",
        "size": "XL",
        "mobile": "8141380085",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "84",
        "fullName": "Rajesh buchiya",
        "tshirtName": "Rajesh buchiya",
        "size": "L",
        "mobile": "9979452585",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "85",
        "fullName": "Buchiya Gautam khanaji",
        "tshirtName": "G.K.MARU",
        "size": "XL",
        "mobile": "9726222463",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "86",
        "fullName": "Buchiya Prince Mohanbhai",
        "tshirtName": "P.M.Buchiya",
        "size": "M",
        "mobile": "7359355850",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "87",
        "fullName": "Brijesh Kudecha",
        "tshirtName": "Brijesh",
        "size": "L",
        "mobile": "9428065521",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "88",
        "fullName": "Jagdish f Buchiya",
        "tshirtName": "Jagdish",
        "size": "L",
        "mobile": "7984361621",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "89",
        "fullName": "Buchiya Navin lakhabhai",
        "tshirtName": "N L BUCHIYA",
        "size": "6XL",
        "mobile": "9687247799",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "90",
        "fullName": "Buchiya shanti lakhabhai",
        "tshirtName": "SHANTI",
        "size": "6XL",
        "mobile": "9687247799",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "91",
        "fullName": "Buchiya Kanti lakhabhai",
        "tshirtName": "KANTI",
        "size": "XL",
        "mobile": "9687247799",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "92",
        "fullName": "Buchiya prakash shivji",
        "tshirtName": "Prakash",
        "size": "L",
        "mobile": "9316652472",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "93",
        "fullName": "Buchiya shiv dayalal",
        "tshirtName": "Shiva",
        "size": "L",
        "mobile": "7575052288",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "94",
        "fullName": "Buchiya MOHANLAL RAMJIBHAI",
        "tshirtName": "M.R BUCHIYA",
        "size": "XXL",
        "mobile": "7359355850",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "95",
        "fullName": "Buchiya jenti damjii",
        "tshirtName": "J.D.",
        "size": "L",
        "mobile": "7874074454",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "96",
        "fullName": "BUCHIYA AMAN CHAGANBHAI",
        "tshirtName": "AMAN",
        "size": "XS/34",
        "mobile": "8980504070",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "97",
        "fullName": "BUCHIYA CUTE CHAGANBHAI",
        "tshirtName": "CUTE",
        "size": "XS/32",
        "mobile": "8980504070",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "98",
        "fullName": "BUCHIYA PREET MOHANBHAI",
        "tshirtName": "PREET",
        "size": "XS/30",
        "mobile": "8980504070",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "99",
        "fullName": "Buchiya mahendra devji",
        "tshirtName": "MAHENDRA",
        "size": "XL",
        "mobile": "82300013791",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "100",
        "fullName": "BUCHIYA ZENIL MOHAN",
        "tshirtName": "ZENIL",
        "size": "XS/24",
        "mobile": "9099490428",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "101",
        "fullName": "BUCHIYA THAVAR KHIMJI",
        "tshirtName": "THAVAR",
        "size": "XL",
        "mobile": "9979316752",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "102",
        "fullName": "BUCHIYA LALJI THAVAR",
        "tshirtName": "LALJI",
        "size": "S/32",
        "mobile": "9979316752",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "103",
        "fullName": "BUCHIYA NIRAV NARSHI",
        "tshirtName": "NIRAV",
        "size": "S/34",
        "mobile": "9265420381",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "104",
        "fullName": "BUCHIYA MAHESH BABULAL",
        "tshirtName": "MAHESH",
        "size": "M",
        "mobile": "8849725682",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "105",
        "fullName": "BUCHIYA KARSHAN NARAN",
        "tshirtName": "KARSHAN",
        "size": "XXL",
        "mobile": "9979063360",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "106",
        "fullName": "RUPESH BHARMAL BUCHIYA",
        "tshirtName": "RUPESH",
        "size": "XXL",
        "mobile": "9913071161",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "107",
        "fullName": "SIDHARTH RUPESH BUCHIYA",
        "tshirtName": "SIDHARTH",
        "size": "XS/28",
        "mobile": "9913071161",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "108",
        "fullName": "TANMAY NARAN BUCHIYA",
        "tshirtName": "TANMAY",
        "size": "XS/34",
        "mobile": "9913071161",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "109",
        "fullName": "BUCHIYA PREM KANJI",
        "tshirtName": "PREM",
        "size": "M/36",
        "mobile": "9512354638",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "110",
        "fullName": "BUCHIYA MAYUR NAVINBHAI",
        "tshirtName": "MN MARU",
        "size": "M",
        "mobile": "8160028072",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "111",
        "fullName": "BUCHIYA BHAVESH DEVJIBHAI",
        "tshirtName": "BHAVESH",
        "size": "L",
        "mobile": "6354965568",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "112",
        "fullName": "BUCHIYA NAVIN DEVJIBHAI",
        "tshirtName": "NAVIN",
        "size": "XXL",
        "mobile": "9687265092",
        "amount": 500,
        "paymentStatus": false
    },
    {
        "_id": "113",
        "fullName": "BUCHIYA ARVIND NATHUBHAI",
        "tshirtName": "ARVIND",
        "size": "XL",
        "mobile": "9327825889",
        "amount": 500,
        "paymentStatus": false
    }
];

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- API Routes ---

// Settings
app.get('/api/settings', (req, res) => {
    res.json(settings);
});

app.post('/api/settings/upi', (req, res) => {
    settings.upiId = req.body.upiId;
    res.json({ message: 'UPI Updated' });
});

app.post('/api/settings/qr', upload.single('qrImage'), (req, res) => {
    if (req.file) {
        settings.qrImage = `/uploads/${req.file.filename}`;
        res.json({ filePath: settings.qrImage });
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

app.delete('/api/settings/qr', (req, res) => {
    settings.qrImage = '';
    res.json({ message: 'QR Removed' });
});

app.post('/api/settings/background', upload.single('bgImage'), (req, res) => {
    if (req.file) {
        settings.bgImage = `/uploads/${req.file.filename}`;
        res.json({ filePath: settings.bgImage });
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

app.delete('/api/settings/background', (req, res) => {
    settings.bgImage = '';
    res.json({ message: 'Background Removed' });
});

// Users
app.get('/api/users', (req, res) => {
    const status = req.query.status;
    let filtered = users;
    if (status === 'paid') filtered = users.filter(u => u.paymentStatus);
    if (status === 'unpaid') filtered = users.filter(u => !u.paymentStatus);
    res.json(filtered);
});

app.get('/api/user/:mobile', (req, res) => {
    const found = users.filter(u => u.mobile === req.params.mobile);
    if (found.length > 0) res.json(found);
    else res.status(404).json({ message: 'User not found' });
});

app.put('/api/user/:id/payment', (req, res) => {
    const user = users.find(u => u._id === req.params.id);
    if (user) {
        user.paymentStatus = req.body.paymentStatus;
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Serve Admin HTML for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'admin.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Mock Server running at http://localhost:${PORT}`);
    console.log(`👉 Main Page: http://localhost:${PORT}`);
    console.log(`👉 Admin Page: http://localhost:${PORT}/admin.html`);
});
