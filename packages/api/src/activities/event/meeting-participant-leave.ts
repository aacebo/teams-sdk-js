import { Account } from '../../models';
import { ActivityBase } from '../base';

export interface MeetingParticipantLeaveEventActivity extends ActivityBase {
  readonly type: 'event';

  /**
   * The name of the operation associated with an invoke or event activity.
   */
  name: 'application/vnd.microsoft.meetingParticipantLeave';

  /**
   * A value that is associated with the activity.
   */
  value: {
    /**
     * The participants info.
     */
    members: {
      /**
       * The participant account.
       */
      user: Account;

      /**
       * The participants info.
       */
      meeting: {
        /**
         * The user in meeting indicator.
         */
        inMeeting: boolean;

        /**
         * The user's role.
         */
        role: string;
      };
    }[];
  };
}
