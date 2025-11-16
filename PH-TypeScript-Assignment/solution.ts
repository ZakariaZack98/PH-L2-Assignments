const formatValue = (
  value: string | number | boolean
): string | number | boolean => {
  switch (typeof value) {
    case "string":
      return value.toUpperCase();
    case "number":
      return value * 10;
    case "boolean":
      return !value;
    default:
      throw new Error("input type is unsupported");
  }
};

const getLength = (value: string | any[]): number => {
  if (typeof value === "string") {
    return value.length;
  } else if (Array.isArray(value)) {
    return value.length;
  } else throw new Error("input type is unsupported");
};

class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

const filterByRating = <T extends { title: string; rating: number }>(
  items: T[]
): T[] => items.filter((item) => item.rating >= 4);

const filterActiveUsers = <
  T extends { id: number; name: string; email: string; isActive: boolean }
>(
  users: T[]
): T[] => users.filter((user) => user.isActive);

interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}
const printBookDetails = (book: Book): void =>
  console.log(
    `Title: ${book.title}, Author: ${book.author}, Published: ${
      book.publishedYear
    }, Available: ${book.isAvailable ? "Yes" : "No"}`
  );

function getUniqueValues(
  arr1: (string | number)[],
  arr2: (string | number)[]
): (string | number)[] {
  const result: (string | number)[] = [];
  for (let i = 0; i < arr1.length; i++) {
    const currentVal = arr1[i];
    if (currentVal !== undefined) {
      let alreadyExists = false;
      for (let j = 0; j < result.length; j++) {
        if (currentVal === result[j]) {
          alreadyExists = true;
          break;
        }
      }
      if (!alreadyExists) result.push(currentVal);
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    const currentVal = arr2[i];
    if (currentVal !== undefined) {
      let alreadyExists = false;
      for (let j = 0; j < result.length; j++) {
        if (currentVal === result[j]) {
          alreadyExists = true;
          break;
        }
      }
      if (!alreadyExists) {
        result.push(currentVal);
      }
    }
  }
  return result;
}

const calculateTotalPrice = <
  T extends { name: string; price: number; quantity: number; discount?: number }
>(
  products: T[]
): number => {
  return products.reduce((acc, curr) => {
    const basePriceTotal = curr.price * curr.quantity;
    if (curr.discount) {
      return acc + (basePriceTotal - basePriceTotal * (curr.discount / 100));
    }
    return acc + basePriceTotal;
  }, 0);
};
