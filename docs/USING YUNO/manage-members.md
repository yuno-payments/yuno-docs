---
title: Manage Members
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    Yuno provides an easy way to create members and manage your team to improve
    your security. On the Yuno Merchant Dashboard, you can add members and
    control roles, giving the right amount of access to each one. The role
    assigned to each user defines their permissions inside the Yuno system. 


    ##
  robots: index
next:
  description: ''
---
Yuno provides an easy way to create members and manage your team to improve your security. On the Yuno Merchant Dashboard, you can add members and control roles, giving the right amount of access to each one. The role assigned to each user defines their permissions inside the Yuno system. 

## Manage your team

To manage your team, you need to access the [Yuno Merchant Dashboard](https://dashboard.y.uno/). 

After logging into your account, click over your user and select **Team** to access the page **Create and manage your team**.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/manageMembers/manage_members1.png" />

Here you can:

* Manage all the active members using the **Active** panel.
* Invite new members using the **Invite member** button.
* Check whom you have invited with the **Pending** panel.

When inviting a new member, you need to provide their email and define their role. You can update a member's information, such as the role or email,  or remove them from the organization at the Active panel.

## Roles management

Yuno provides, by default, four roles to attribute to new members. Each one has different access permissions. Below you will find a table comparing the default roles' permissions:

<HTMLBlock>{`
<style>
  .roles-table {
    text-align: center;
    empty-cells: hide;
  }

  .roles-table th:empty {
    visibility: hidden;
    border: 0px;
  }

  .roles-table tbody tr td:first-child {
    text-align: left;
  }

  .help-tip {
    margin-right: 0.5rem;
    display: inline-block;
    text-align: center !important;
    background-color: var(--yuno-purple-50);
    border-radius: 15%;
    width: 18px;
    height: 18px;
    font-size: 14px;
    /*line-height: 26px;*/
    cursor: help;
    /*vertical-align:top;*/
  }

  .help-tip:before {
    content: 'i';
    font-weight: bold;
    color: var(--yuno-off-white);
  }

  .help-tip:hover p {
    display: block;
    transform-origin: 100% 0%;

    -webkit-animation: fadeIn 0.3s ease-in-out;
    animation: fadeIn 0.3s ease-in-out;

  }

  .help-tip p {
    /* The tooltip */
    display: none;
    text-align: left;
    background-color: var(--yuno-off-white);
    padding: 15px;
    width: 300px;
    position: absolute;
    border-radius: 3px;
    /* box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2); */
    border: 1px solid var(--yuno-purple);
    /*right: -4px;*/
    /* color: #FFF; */
    font-size: 13px;
    line-height: 1.4;
  }



  .help-tip p:after {
    /* Prevents the tooltip from being hidden */
    width: 100%;
    height: 40px;
    content: '';
    position: absolute;
    top: -40px;
    left: 0;
  }

  /* CSS animation */

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.6);
    }

    100% {
      opacity: 100%;
      transform: scale(1);
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 100%;
    }
  }
</style>

<body>
  <table class="roles-table">
    <thead>
      <tr>
        <th></th>
        <th colspan="5">Default Roles</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Permissions</td>
        <td>Admin</td>
        <td>Agent</td>
        <td>Developer</td>
        <td>Read only</td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to view the payments list and transaction details.</p>
          </div>
          View payments and transactions
        </td>
        <td>
          <p class="bi bi-check-square-fill" style="font-size: 1.1rem;"></p>
        </td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to export payments and transaction reports.</p>
          </div>
          Export reports
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to make full and partial refunds, cancellations and manual captures.</p>
          </div>
          Operate payments
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to view payment links.</p>
          </div>
          View payment links
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to create, edit, share and delete payment links.</p>
          </div>
          Manage payment links
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to view our payments stack offer.</p>
          </div>
          View connections
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to add, edit, archive, reactivate and delete a connection.</p>
          </div>
          Manage connections
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to view how the checkout is setup.</p>
          </div>
          View your checkout
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able tu build and publish the checkout at any time.</p>
          </div>
          Build your checkout
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to view how a payment is processed.</p>
          </div>
          View your processing routes
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to create, edit and publish a payment processing route.</p>
          </div>
          Manage your processing routes
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to view the insights and payment performance to make data-informed
              decisions.</p>
          </div>
          Access to actionable payment insights
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to view settlement reports.</p>
          </div>
          View settlement reports
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to export settlement reports.</p>
          </div>
          Export settlement reports
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to view the account keys.</p>
          </div>
          View account keys
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to add, edit and delete a webhook.</p>
          </div>
          Manage webhooks
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to create, edit and delete an account.</p>
          </div>
          Manage accounts
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to view the list of team members and roles.</p>
          </div>
          View team and roles
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The team member will be able to send an invitation, edit and delete a member.</p>
          </div>
          Manage a team
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
      </tr>
      <tr>
        <td>
          <div class="help-tip">
            <p>The member will be able to create, edit and delete custom roles that can be assigned to team members.</p>
          </div>
          Manage roles
        </td>
        <td><i class="bi bi-check-square-fill" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
        <td><i class="bi bi-square" style="font-size: 1.1rem;"></i></td>
      </tr>
    </tbody>
  </table>
</body>
`}</HTMLBlock>

To check the available roles and their permissions in your account, after accessing the **Create and manage your team**, click on **Roles management**. In addition to the existing roles, you can create new ones to fulfill your needs by clicking **Create role**.

When creating new roles, you need to provide a name and a description. Afterward, you will select the permissions you want to grant to users assigned to this new role.

<Image align="center" src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/manageMembers/manage_members2.png" />

All roles created will be available when creating or updating members' information.
