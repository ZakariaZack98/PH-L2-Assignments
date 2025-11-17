

# TypeScript: type বনাম interface — পার্থক্য যেখানে 

আমরা যখন টাইপস্ক্রিপ্ট দিয়ে প্রোগ্রামিং করি তখন প্রায়ই আমাদের Type এবং Interface নিয়ে কাজ করতে হয়। মূলত দুইটার উদ্দেশ্যই ডেটা কে কাঙ্খিত গঠন দেওয়া কিন্তু এই দুইটি ডেক্লারেশন এর মধ্যে বেশ কিছু পার্থক্য আছে যা আমাদের কোডের আর্কিটেকচার, রিডেবিলিটি এবং স্কেলেবিলিটির উপর প্রভাব ফেলে। 

----------
## Type এবং Interface এর উদ্দেশ্যগত পার্থক্য 


**Type**: এটি একটি সাধারন টাইপ ডেক্লারেশন টুল যা প্রিমিটিভ টাইপের ডাটাগুলোকে ডিক্লেয়ার করতে ব্যবহার হয় এবং সেই ডেটা টাইপ গুলোর মধ্যে Union, Intersection প্রয়োগ করতে ব্যবহার করা হয়।

**Interface**: Interface কে মূলত object  এর গঠন নির্ধারণ করতে ব্যবহার করা হয়। অন্যভাবে বলা যায় Interface হলো object এর জন্য ব্লুপ্রিন্ট।  

```
interface User {
  name: string;
  age: number;
}

type userID = number | string;
```

----------

##  Declaration Merging এ পার্থক্য

-   interface কে একাধিকবার declare করলে TypeScript সেগুলো merge করে।
-   type এর ক্ষেত্রে merge হয় না, বরং intersection ব্যবহার করতে হয়। এদিক থেকে inteface এর জন্য আবার সরাসরি union অথবা intersection করা যায় না

```
type Status = 'loading' | 'success' | 'error';
type Id = string | number; //union করা হয়েছ

interface Profile {
  username: string;
}
interface Profile {
  id: Id;
}
// Result: { username: string; id: Id } //Declaration merge হয়ে গেছে

```

-----------
## Class এর সাথে ব্যবহার
-   interface ক্লাসের সাথে implements হিসেবে ব্যবহার করা যায়:
```
interface Animal {
 speak(): void; 
} 
class Dog implements Animal { 
	speak() {
		console.log('Woof!'); 
	} 
}
```

type ক্লাসে implements করা যায় না।




# কখন কোনটা ব্যবহার করা উচিত

TypeScript-এ interface ব্যবহার করা উচিত যখন আপনি object-এর গঠন নির্ধারণ করছেন এবং আপনি চান যে তা future-এ extend বা merge করা যাবে। যেমন ক্লাস implement বা declaration marging এর ক্ষেত্রে।

অন্যদিকে, যখন আপনাকে union, intersection, tuple, বা primitive টাইপ define করতে হয়, অথবা function signature বা utility টাইপ তৈরি করতে হয় তখন আবার type বেশি উপযুক্ত। বড় স্কেলেবেল সিস্টেমে interface এর extensibility সুবিধা দেয়, আর type দিয়ে complex টাইপ composition সহজ হয়। প্রোজেক্টে দুটোই একসাথে ইউজ কেস ভেদে যথোপযুক্ত ভাবে ব্যবহার করলে কোড আরও readable ও maintainable হয়।





#  TypeScript-এ `keyof` কীওয়ার্ড এবং এর ব্যবহার

TypeScript-এ keyof একটি powerful utility keyword যা একটি অবজেক্ট টাইপের key গুলোর ইউনিয়ন  তৈরি করে। কোন একটি বিশেষ key একটি অবজেক্ট টাইপের মধ্যে আছি কিনা সেটির উপস্থিতি নিশ্চিত করার জন্য মূলত এই keyof কিওয়াডটি ব্যবহার হয়ে থাকে। 

----------

ধরা যাক, আপনার কাছে একটি অবজেক্ট টাইপ আছে:

```
type Richman= {
  bike: string;
  car: string;
  seconderyCar: string;
};
```

এখন আপনি যদি লিখেন:


type UserKeys = keyof User;


তাহলে UserKeys হবে:

'bike' | 'car' | 'seconderyCar'


অর্থাৎ, keyof অবজেক্টের সব কীর একটি ইউনিয়ন টাইপ তৈরি করে।

----------

##  ব্যবাহারিক প্রয়োগ 

```
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  name: 'Mr. X',
  age: 25,
  isActive: true,
};

const name = getValue(user, 'name'); //result- string
const age = getValue(user, 'age');   //result- number
```

এখানে getValue ফাংশনটি শুধুমাত্র সেই কী-গুলোই গ্রহণ করবে যেগুলো user অবজেক্টে আছে.

----------

keyof টাইপস্ক্রিপ্টে টাইপ-সেফ ডায়নামিক প্রপার্টি অ্যাক্সেসের জন্য অপরিহার্য। এটি জেনেরিক ফাংশন, ম্যাপড টাইপ এবং ইউটিলিটি টাইপ তৈরিতে সাহায্য করে।


