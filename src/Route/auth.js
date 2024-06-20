export function isAuth() {
    try {
      const isLogin = localStorage.getItem('users');
      if (isLogin) {
        return isLogin;
      }
      return false;
    } catch (err) {
      return false;
    }
}

export function isCart() {
    try {
      const cartItem = localStorage.getItem('myitems');
      console.log('cartItem', cartItem)
      if (cartItem) {
        return cartItem;
      }
      return false;
    } catch (err) {
      return false;
    }
}