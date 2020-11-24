// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragableController extends cc.Component {
    _initPos: cc.Vec3 = null;
    _context: cc.Node = null;
    _slot: cc.Node = null;
    resetObj() {
        this.node.position = this._initPos;
        this.node.parent = this._context;
    }

    onLoad() {
        this._initPos = this.node.position;
        this._context = this.node.parent;
        this._slot = this.node.parent.parent.getChildByName('slot');
    }
    _setFollowTouchPos(e) {
        let p = e.touch.getLocation();
        let moveLayer = cc.find('Canvas');
        let lp = moveLayer.convertToNodeSpaceAR(p);
        this.node.position = lp;
    }

    _testSlot(p: cc.Vec3) {
        let lp = this._slot.convertToNodeSpaceAR(p);
        if (
            lp.x >= -this._slot.width / 2 &&
            lp.x <= this._slot.width / 2 &&
            lp.y >= -this._slot.height / 2 &&
            lp.y <= this._slot.height / 2
        ) {
            return true;
        } else {
            return false;
        }
    }
    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (e) => {
            this._setFollowTouchPos(e);
        });
        this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
            this._setFollowTouchPos(e);
            let moveLayer = cc.find('Canvas');
            this.node.parent = moveLayer;
        });
        this.node.on(cc.Node.EventType.TOUCH_END, (e) => {
            // test trash bin
            if (this._testSlot(e.touch.getLocation())) {
                this.node.parent = this._slot;
            } else {
                this.resetObj();
            }
        });
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, (e) => {});
    }
}
