// import React, { useState, useRef, useEffect } from 'react';

// const userIdentityService = {};

// const UserIdentityDetails = ({ userIdentityData, hideMask }) => {
//     return (
//         <div class="user-identity-container">
//             <div class="user-identity-details-mask" ng-if="shouldShowMask" layout-padding>
//                 <section layout="row">
//                     <div class="user-identity-details-icon-mask animated-background"></div>
//                     <div>
//                         <div class="user-identity-details-name-mask animated-background"></div>
//                         <div class="user-identity-details-email-mask animated-background"></div>
//                     </div>
//                 </section>
//             </div>

//             <div
//                 class="user-identity-details no-outline"
//                 ng-click="toggleUserDetails($event)"
//                 ng-if="!shouldShowMask"
//                 layout-padding
//             >
//                 <section layout="row" layout-align="start center" flex>
//                     <div layout="column" flex="15" class="avatar-icon-container">
//                         <img src="images/avatar.png" />
//                     </div>
//                     <div layout="column" flex="75">
//                         <div class="display-name">
//                             <span> displayName </span>
//                             {/* <text-tooltip text="displayName"></text-tooltip> */}
//                         </div>
//                         <div class="email" ng-show="email">
//                             <span> email </span>
//                             {/* <text-tooltip text="email"></text-tooltip> */}
//                         </div>
//                     </div>
//                     <span
//                         layout="column"
//                         layout-align="center end"
//                         flex-offset="5"
//                         flex="5"
//                         class="arrow-icon-container"
//                         ng-show="expandableItems && expandableItems.length > 0"
//                     >
//                         <i ng-class="isExpanded ? 'ion-ios-arrow-up' : 'ion-ios-arrow-down'" class="ion-icon"></i>
//                     </span>
//                 </section>
//             </div>

//             <div class="expandable-user-details collapsed">
//                 <div layout-padding>
//                     <div ng-scrollbars ng-scrollbars-config="scrollbarConfig" class="scrollable-container">
//                         <div layout="row" ng-repeat="item in expandableItems" class="user-details-row">
//                             <div flex="30" layout-align="end center" class="label">
//                                 <span> item.label </span>
//                                 {/* <text-tooltip text="item.label"></text-tooltip> */}
//                             </div>
//                             <div
//                                 flex="65"
//                                 flex-offset="5"
//                                 layout-align="start center"
//                                 class="value"
//                                 ng-switch
//                                 on="item.isLink"
//                             >
//                                 <span ng-switch-default>item.value</span>
//                                 <a ng-switch-when="true" target="_blank" href="{{ item.value }}">
//                                     item.value
//                                 </a>
//                                 {/* <text-tooltip text="item.value"></text-tooltip> */}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserIdentityDetails;
