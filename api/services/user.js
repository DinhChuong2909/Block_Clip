const prisma = require("../../prisma");
let { hasNextPage } = require("../utils/request-utils");
let constants = require("../../config/constants");

/**
 * Includes all the User services that controls
 * the User Data object from the database
 */

class UserService {
  async createUser(params) {
    try {
      let { wallet } = params;
      let user = await prisma.users.create({
        data: {
            wallet: wallet,
            username: wallet
        },
      });
      return user;
    } catch (err) {
      console.log(err);
      throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }

  async getUsers({ limit, offset, orderBy, username, wallet }) {
    try {
      let where = {
        active: true,
        username: {
          contains: username
        },
        wallet: {
          contains: wallet
        }
      };

      let count = await prisma.users.count({ where });
      let users = await prisma.users.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset,
      });

      return {
        users,
        count,
        limit,
        offset,
        has_next_page: hasNextPage({ limit, offset, count }),
      };
    } catch (err) {
      console.log(err);
      throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }

  async getUser(params) {
    try {
      let { userWallet } = params;
      let user = await prisma.users.findMany({
        where: {
          wallet: userWallet,
        },
      });
      return user.at(0);
    } catch (err) {
      console.log(err);
      throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }

//   async getUsersMakerOrders({ userId, limit, offset, orderBy }) {
//     try {
//       let count = await prisma.orders.count({
//         where: { AND: [{ seller: parseInt(userId) }, { active: true }] },
//       });
//       let orders = await prisma.users.findMany({
//         where: {
//           id: parseInt(userId),
//         },
//         select: {
//           seller_orders: {
//             where: {
//               active: true,
//             },
//             include: {
//               categories: {
//                 include: {
//                   categoriesaddresses: {
//                     where: { chain_id: constants.MATIC_CHAIN_ID },
//                     select: { address: true, ethereum_address: true },
//                   },
//                 },
//               },
//               erc20tokens: {
//                 include: {
//                   erc20tokensaddresses: {
//                     where: { chain_id: constants.MATIC_CHAIN_ID },
//                     select: { address: true },
//                   },
//                 },
//               },
//             },
//             orderBy,
//             take: limit,
//             skip: offset,
//           },
//         },
//       });

//       return {
//         orders,
//         limit,
//         offset,
//         has_next_page: hasNextPage({ limit, offset, count }),
//       };
//     } catch (err) {
//       console.log(err);
//       throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async getUsersActiveOrders({ userId, limit, offset, orderBy }) {
//     try {
//       let count = await prisma.orders.count({
//         where: {
//           AND: [{ seller: parseInt(userId) }, { active: true }, { status: 0 }],
//         },
//       });
//       let orders = await prisma.users.findMany({
//         where: {
//           id: parseInt(userId),
//         },
//         select: {
//           seller_orders: {
//             where: {
//               active: true,
//               status: 0,
//             },
//             include: {
//               categories: {
//                 include: {
//                   categoriesaddresses: {
//                     where: { chain_id: constants.MATIC_CHAIN_ID },
//                     select: { address: true, ethereum_address: true },
//                   },
//                 },
//               },
//               erc20tokens: {
//                 include: {
//                   erc20tokensaddresses: {
//                     where: { chain_id: constants.MATIC_CHAIN_ID },
//                     select: { address: true },
//                   },
//                 },
//               },
//             },
//             orderBy,
//             take: limit,
//             skip: offset,
//           },
//         },
//       });

//       return {
//         orders,
//         limit,
//         offset,
//         has_next_page: hasNextPage({ limit, offset, count }),
//       };
//     } catch (err) {
//       console.log(err);
//       throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async getUsersTakerOrders({ userId, limit, offset, orderBy }) {
//     try {
//       let count = await prisma.orders.count({
//         where: { AND: [{ buyer: parseInt(userId) }, { active: true }] },
//       });
//       let orders = await prisma.users.findMany({
//         where: {
//           id: parseInt(userId),
//         },
//         select: {
//           buyer_orders: {
//             where: {
//               active: true,
//             },
//             include: {
//               categories: {
//                 include: {
//                   categoriesaddresses: {
//                     where: { chain_id: constants.MATIC_CHAIN_ID },
//                     select: { address: true, ethereum_address: true },
//                   },
//                 },
//               },
//               erc20tokens: {
//                 include: {
//                   erc20tokensaddresses: {
//                     where: { chain_id: constants.MATIC_CHAIN_ID },
//                     select: { address: true },
//                   },
//                 },
//               },
//             },
//             orderBy,
//             take: limit,
//             skip: offset,
//           },
//         },
//       });

//       return {
//         orders,
//         limit,
//         offset,
//         has_next_page: hasNextPage({ limit, offset, count }),
//       };
//     } catch (err) {
//       console.log(err);
//       throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async getUsersBids({ userId, limit, offset, orderBy }) {
//     try {
//       let count = await prisma.bids.count({
//         where: { AND: [{ users_id: parseInt(userId) }, { active: true }] },
//       });
//       let bids = await prisma.users.findMany({
//         where: {
//           id: parseInt(userId),
//         },
//         select: {
//           bids: {
//             where: {
//               active: true,
//             },
//             orderBy,
//             take: limit,
//             skip: offset,
//           },
//         },
//       });

//       return {
//         bids,
//         limit,
//         offset,
//         has_next_page: hasNextPage({ limit, offset, count }),
//       };
//     } catch (err) {
//       console.log(err);
//       throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async getUsersFavourite({ userId, limit, offset, orderBy }) {
//     try {
//       let count = await prisma.favourites.count({
//         where: { AND: [{ users_id: parseInt(userId) }] },
//       });
//       let favourites = await prisma.users.findMany({
//         where: {
//           id: parseInt(userId),
//         },
//         select: {
//           favourites: {
//             orderBy,
//             take: limit,
//             skip: offset,
//             include: {
//               orders: {
//                 include: {
//                   categories: {
//                     include: {
//                       categoriesaddresses: {
//                         where: { chain_id: constants.MATIC_CHAIN_ID },
//                         select: { address: true, ethereum_address: true },
//                       },
//                     },
//                   },
//                   erc20tokens: {
//                     include: {
//                       erc20tokensaddresses: {
//                         where: { chain_id: constants.MATIC_CHAIN_ID },
//                         select: { address: true },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       });

//       return {
//         favourites: favourites[0].favourites,
//         limit,
//         offset,
//         has_next_page: hasNextPage({ limit, offset, count }),
//       };
//     } catch (err) {
//       console.log(err);
//       throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async createUsersFavourite(params) {
//     try {
//       let { userId, orderId } = params;
//       let favourites = await prisma.favourites.create({
//         data: {
//           users: {
//             connect: {
//               id: parseInt(userId),
//             },
//           },
//           orders: {
//             connect: {
//               id: parseInt(orderId),
//             },
//           },
//           updated: new Date(),
//         },
//       });
//       return favourites;
//     } catch (err) {
//       console.log(err);
//       throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async deleteUsersFavourite(params) {
//     try {
//       let { favouriteId } = params;
//       let favourite = await prisma.favourites.delete({
//         where: { id: parseInt(favouriteId) },
//       });
//       return favourite;
//     } catch (err) {
//       console.log(err);
//       throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async getFavourite(params) {
//     try {
//       let { favouriteId } = params;
//       let favourite = await prisma.favourites.findOne({
//         where: {
//           id: parseInt(favouriteId),
//         },
//       });
//       return favourite;
//     } catch (err) {
//       console.log(err);
//       throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async favouriteExists(params) {
//     try {
//       let { userId, orderId } = params;
//       let favourite = await prisma.favourites.findMany({
//         where: {
//           AND: [
//             { users_id: parseInt(userId) },
//             { order_id: parseInt(orderId) },
//           ],
//         },
//       });
//       return favourite;
//     } catch (err) {
//       console.log(err);
//       throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
//     }
//   }

  async userExists(params) {
    try {
      let { wallet } = params;
      let users = await prisma.users.findMany({
        where: {
          wallet: wallet,
        },
      });
      return users;
    } catch (err) {
      console.log(err);
      throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }

//   async getUserNotification({ userId, limit, offset, orderBy }) {
//     try {
//       let count = await prisma.notifications.count({
//         where: {
//           usersId: parseInt(userId),
//         },
//       });

//       let unread_count = await prisma.notifications.count({
//         where: {
//           usersId: parseInt(userId),
//           read: false,
//         },
//       });
//       let notifications = await prisma.notifications.findMany({
//         where: {
//           usersId: parseInt(userId),
//         },
//         select: {
//           read: true,
//           id: true,
//           active: true,
//           created: true,
//           message: true,
//           updated: true,
//           usersId: true,
//           order_id: true,
//           type: true,
//           orders: {
//             select: { type: true, txhash: true, categories: { select: { img_url: true } } },
//           },
//         },
//         orderBy: { created: constants.SORT_DIRECTION.DESC },
//         take: limit,
//         skip: offset,
//       });

//       return {
//         notifications,
//         limit,
//         offset,
//         has_next_page: hasNextPage({ limit, offset, count }),
//         unread_count,
//       };
//     } catch (err) {
//       console.log(err);
//       throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async readUserNotification({ userId }) {
//     try {
//       let notifications = await prisma.notifications.updateMany({
//         where: {
//           read: false,
//           usersId: parseInt(userId),
//         },
//         data: { read: true },
//       });

//       return notifications;
//     } catch (err) {
//       console.log(err);
//       throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
//     }
//   }
  async updateUser(params) {
    try {
      let current = await this.getUser(params);
      let { username: current_username, avatar: current_avatar, cover: current_cover, active: current_active } = current;
      let { username: params_username, avatar: params_avatar, cover: params_cover, active: params_active } = params;

      let user = await prisma.users.update({
        where: { wallet: params.userWallet },
        data: {
          cover: params_cover
            ? params_cover
            : current_cover,
          active: params_active ? params_active : current_active,
          avatar: params_avatar ? params_avatar : current_avatar,
          username: params_username ? params_username : current_username,
        },
      });
      return user;
    } catch (err) {
      console.log(err);
      throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }

  // get notifications of a user by type, limit, offset
  async getNotifications(params) {
    try {
      let { userWallet, limit, offset, type} = params;

      console.log(userWallet, limit, offset, type)

      let where = {
        wallet: {
          equals: userWallet, 
        },
        type: {
          equals: type
        }
      }

      let notification = await prisma.notifications.findMany({ 
        where,
        take: limit,
        skip: offset,
      });

      return notification;
    } catch (err) {
      throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }


  // User subscribe a collection
  async subscribeCollection(params) {
    try {
      let { userWallet, chainID, collectionID, paymentType, packageType, status, price, seller} = params

      let marketPackage = await prisma.marketpackages.create({
        data: {
          subscriber: { connect: { wallet: userWallet } },
          chainID: chainID,
          collectionID: collectionID,
          paymentType: paymentType,
          packageType: packageType,
          status: status,
          price: price,
          seller: seller
        }
      })

      return marketPackage;

    } catch (err) {
      throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }

  // Check expire of a subscriber
  async checkExpire(userWallet) {
    try {

      let currentDate = new Date();
      let timeExpired;
      
      let marketPackages = await prisma.marketpackages.findMany({
        where: {
          subscriber: {
            equals: userWallet
          }
        }
      })

      marketPackages.forEach((pkg) => {
        if (pkg.packageType === 1) {
          // time Expired is 30 day
          timeExpired = 30;
        } else if (pkg.packageType === 2)  {
          // time Expired is 90 day
          timeExpired = 90;
        }
        else {
          // time Expired is 365 day
          timeExpired = 365;
        }  

        if (pkg.createdAt < currentDate + timeExpired) {
          pkg.update({
            status: 2
          })
        }
      })

    } catch (err) {
      throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }

  // get all subscribe of a user
  async getSubscriber(params) {
    try {
      let { userWallet} = params

      await checkExpire(userWallet)

      let marketPackages = await prisma.marketpackages.findMany({
        where: {
          subscriber: {
            equals: userWallet
          }
        }
      })

      return marketPackages;
    } catch (err) {
      throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }

  async getSubscriberByID(params) {
    try {
      let { userWallet, ID} = params

      await checkExpire(userWallet)

      let marketPackages = await prisma.marketpackages.findMany({
        where: {
          subscriber: {
            equals: userWallet
          },
          id: {
            equals: ID
          },
        }
      })

      return marketPackages;
    } catch (err) {
      throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }

}


module.exports = UserService;
