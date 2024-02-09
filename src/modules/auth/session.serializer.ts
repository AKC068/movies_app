import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    console.log("serialize", "user:", user);
    done(null, user);
    console.log("serialized \n");
  }

  deserializeUser(payload: any, done: (err: Error, user: any) => void): any {
    console.log("deserialize", "user:", payload, "\n");
    done(null, payload);
    console.log("deserialized \n");
  }
}
