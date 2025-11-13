import categoriesData from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.categories];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    const category = this.categories.find(cat => cat.Id === parseInt(id));
    return category ? { ...category } : null;
  }

  async getByName(name) {
    await new Promise(resolve => setTimeout(resolve, 150));
    const category = this.categories.find(cat => 
      cat.name.toLowerCase() === name.toLowerCase()
    );
    return category ? { ...category } : null;
  }
}

const categoryService = new CategoryService();
export default categoryService;