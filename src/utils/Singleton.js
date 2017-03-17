let gInstance = null;

class Singleton {

    static getInstance() {
        if (null == gInstance) {
            gInstance = new Singleton();
        }

        return gInstance;
    }

    Singleton() {
        if (null == gInstance) {
            gInstance = this;
        }

        return gInstance;
    }

}
