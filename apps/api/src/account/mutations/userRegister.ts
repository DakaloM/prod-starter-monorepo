// import { UserRegisterInput } from "@imax/client";
// import { BadRequestError, ConflictError } from "@imax/serverkit";
// import { faker } from "@imax/testkit";
// import * as argon from "argon2";
// import * as saIdParser from "south-african-id-parser";
// import { Context } from "~/context";
// import { getMatchValues } from "~/domain/match";
// import { Applicant } from "../applicant";
// import { User, UserRole } from "../user";
// import { Contact } from "~/contact";
// import { createContact } from "~/contact/mutation";

// export async function userRegister(input: UserRegisterInput, ctx: Context) {
//   const { confirmPassword, mobileNumber, businessNumber, privateNumber, idNumber, ...attrs } =
//     input;
//   const { email, password, ...rest } = attrs;

//   const user = await User.query(ctx.db)
//     .where({ email })
//     .orWhere({ idNumber })
//     .first();

//   if (user) {
//     throw new ConflictError({
//       message: "User already exist",
//       path: getMatchValues(user, { email }),
//     });
//   }

//   if (password !== confirmPassword) {
//     throw new BadRequestError({
//       message: "Passwords do not match",
//     });
//   }

//   const parseInfo = saIdParser.parse(idNumber);
//   if (!parseInfo.isValid) {
//     throw new BadRequestError({ message: "Invalid RSA ID Number" });
//   }

//   const sortName = User.getSortName(attrs.name, attrs.surname);

//   return await User.transaction(ctx.db, async (trx) => {
//     const newUser = await User.query(trx).insert({
//       ...attrs,
//       password: await argon.hash(password),
//       sortName,
//       role: UserRole.Applicant,
//       idNumber
//     });

//     await Applicant.query(trx).insert({
//       userId: newUser.id,
//       applicantNumber: faker.string.numeric(6),
//       name: newUser.name,
//       surname: newUser.surname,
//     });

//     await Contact.query(trx).insert({
//       userId: newUser.id,
//       email,
//       mobileNumber,
//       businessNumber,
//       privateNumber,
//     });

//     return newUser;
//   });
// }
