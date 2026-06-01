// 인터페이스 정의
interface Vehicle {
  brand: string;
  year?: number;
  readonly id: number;
}

interface ElectricVehicle extends Vehicle {
  batteryCapacity: number;
  charge(): void;
}

interface GasVehicle extends Vehicle {
  fuelType: "gasoline" | "diesel";
}

// 다중 상속
interface Log {
  log(message: string): void;
}

interface SmartCar extends ElectricVehicle, Log {
  autopilot: boolean;
}

// 인덱스 시그니처 활용
interface Specs {
  [key: string]: string | number;
}

// 타입 가드를 활용한 함수
function describeVehicle(v: ElectricVehicle | GasVehicle): string {
  if ("batteryCapacity" in v) {
    return `${v.brand} 전기차 - 배터리: ${v.batteryCapacity}kWh`;
  }
  return `${v.brand} 내연기관차 - 연료: ${v.fuelType}`;
}

// 함수 시그니처
interface CalcRange {
  (battery: number, efficiency: number): number;
}

const calcRange: CalcRange = (battery, efficiency) => battery / efficiency;

// 실제 객체 생성
const tesla: SmartCar = {
  id: 1,
  brand: "Tesla",
  year: 2024,
  batteryCapacity: 100,
  autopilot: true,
  charge() {
    console.log(`${this.brand} 충전 시작`);
  },
  log(message: string) {
    console.log(`[LOG] ${message}`);
  },
};

const bmw: GasVehicle = {
  id: 2,
  brand: "BMW",
  fuelType: "gasoline",
};

// 타입 단언
const specs: unknown = { range: 500, weight: 2100 };
const vehicleSpecs = specs as Specs;

// 옵셔널 체크
function printYear(v: Vehicle): void {
  if (v.year !== undefined) {
    console.log(`${v.brand} 출시연도: ${v.year}`);
  } else {
    console.log(`${v.brand} 출시연도 미등록`);
  }
}

// 실행
console.log(describeVehicle(tesla)); // "Tesla 전기차 - 배터리: 100kWh"
console.log(describeVehicle(bmw));   // "BMW 내연기관차 - 연료: gasoline"
console.log(calcRange(100, 5));      // 20
tesla.charge();                      // "Tesla 충전 시작"
tesla.log("시스템 정상");             // "[LOG] 시스템 정상"
printYear(tesla);                    // "Tesla 출시연도: 2024"
printYear(bmw);                      // "BMW 출시연도 미등록"