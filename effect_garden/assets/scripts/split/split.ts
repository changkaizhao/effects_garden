// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class SplitCtr extends cc.Component {
    start() {
        // 传入形状节点
        let material = this.getComponent(cc.RenderComponent).getMaterial(0);
        // material.setProperty(
        //     ShaderInfoType.S_WINDOWSIZE,
        //     cc.v2(cc.winSize.width, cc.winSize.height)
        // );

        let arr = new Float32Array(400);
        arr[0] = 0.25;
        arr[4] = 0.5;
        material.setProperty('s_vertex', arr);
    }
    speed = 30;
    update(dt) {
        if (this.node.position.x > 100) {
            this.speed *= -1;
        }

        if (this.node.position.x < -100) {
            this.speed *= -1;
        }

        this.node.position = cc.v3(this.node.position.x + dt * this.speed, 0, 0);
    }
}
