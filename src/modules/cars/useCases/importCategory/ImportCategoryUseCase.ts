import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import csvParse from "csv-parser";
import fs from "fs";
import { inject, injectable } from "tsyringe";

interface ICategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private importCategoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories = [] as ICategory[];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          categories.push({
            name: line.SUV,
            description: line["Utilitário esportivo"],
          });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = (await this.loadCategories(file)) as ICategory[];

    categories.forEach((category): void => {
      const exist = this.importCategoriesRepository.findByName(category.name);

      if (!exist) {
        this.importCategoriesRepository.create({
          name: category.name,
          description: category.description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
