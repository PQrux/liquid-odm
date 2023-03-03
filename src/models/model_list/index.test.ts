import ModelList from ".";
import { User } from "../../../__mocks__/models/users";

describe('ModelList class', () => {
    
    it('should add the given model to its list by the ROOT_PATH property of MODEL_CONFIG.', () => {
        const modelList = new ModelList();
        modelList.addModel(User);
        expect(modelList.list).toHaveProperty(User.prototype.getModelConfig().ROOT_PATH);
    });

})