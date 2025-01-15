import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDto = (dtoClass: any) => {
 
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   
    const dtoInstance = plainToInstance(dtoClass, req.body);
    console.log('DTO-VALIDATOR',{'dtoClass': dtoClass, 'req.body': req.body})
    if (!dtoInstance) {
      res.status(400).json({
        message: "Invalid data",
      });
      return;
    }

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(400).json({
        errors: errors.map(err => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
      return;
    }

    next();
  };
};
