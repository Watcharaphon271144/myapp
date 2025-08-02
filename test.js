// ! morning workshop on Day 1
// * switch case เร็วกว่า Object Lookups O(1) 
// Todo: if-else
const monthMap = {
    1: "มกราคม",
    2: "กุมภาพันธ์",
    3: "มีนาคม",
    4: "เมษายน",
    5: "พฤษภาคม",
    6: "มิถุนายน",
    7: "กรกฎาคม",
    8: "สิงหาคม",
    9: "กันยายน",
    10: "ตุลาคม",
    11: "พฤศจิกายน",
    12: "ธันวาคม"
};

let month = 13
if (!!monthMap[month]) {
    console.log(monthMap[month])
} else {
    console.log("เลขเดือนไม่ถูกต้อง")
}
// Todo: switch case
let monthNumber = 3
switch (monthNumber) {
    case 1: console.log("มกราคม"); break;
    case 2: console.log("กุมภาพันธ์"); break;
    case 3: console.log("มีนาคม"); break;
    case 4: console.log("เมษายน"); break;
    case 5: console.log("พฤษภาคม"); break;
    case 6: console.log("มิถุนายน"); break;
    case 7: console.log("กรกฎาคม"); break;
    case 8: console.log("สิงหาคม"); break;
    case 9: console.log("กันยายน"); break;
    case 10: console.log("ตุลาคม"); break;
    case 11: console.log("พฤศจิกายน"); break;
    case 12: console.log("ธันวาคม"); break;
    default: console.log("เลขเดือนไม่ถูกต้อง");
}

// ! workshop on Day 2
