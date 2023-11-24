import { Injectable } from '@nestjs/common';
import { KeyboardService } from 'src/keyboard/keyboard.service';
import { KeycapService } from 'src/keycap/keycap.service';
import { SwitchesService } from 'src/switches/switches.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly keyboardService: KeyboardService,
    private readonly keycapService: KeycapService,
    private readonly switchesService: SwitchesService,
  ) {}
  async getAllProducts() {
    const keyboards = await this.keyboardService.getAllKeyboards();
    const keycaps = await this.keycapService.getAll();
    const switches = await this.switchesService.getAll();
    return [...keyboards, ...keycaps, ...switches];
  }
  async getFilteredProducts(filters: {
    type: 'keyboard' | 'keycap' | 'switches';
    category: string;
    search: string;
  }) {
    let products: any[];
    const { type, category, search } = filters;
    switch (type) {
      case 'keyboard':
        products = await this.keyboardService.getAllKeyboards();
        break;
      case 'keycap':
        products = await this.keycapService.getAll();
        break;
      case 'switches':
        products = await this.switchesService.getAll();
        break;
      default:
        products = await this.getAllProducts();
    }
    products = products.filter((product) => product[category] == search);
    return products;
  }
}
