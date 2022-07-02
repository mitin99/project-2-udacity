import { UserStore } from './../../src/models/user';
const userStore = new UserStore()
describe("User Model", () => {
    it('should have an index method', () => {
        expect(userStore.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(userStore.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(userStore.create).toBeDefined();
      });
      it('should have a authenticate method', () => {
        expect(userStore.authenticate).toBeDefined();
      });
});