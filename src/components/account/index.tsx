import React from 'react';
import {Stack} from '@fluentui/react/lib/Stack';
import styles from './styles';

interface IAccountOwnProps {
	account: string | null | undefined;
	balance: number | string;
}

const tokens = {
	childrenGap: 5
};

const Account: React.FC<IAccountOwnProps> = ({account, balance}): JSX.Element => (
	<Stack tokens={tokens}>
		<Stack.Item align="start" styles={styles}>
			Account: {account || 'not found'}
		</Stack.Item>

		<Stack.Item align="start" styles={styles}>
			{account && <div>Balance: {balance} ETH</div>}
		</Stack.Item>
	</Stack>
);

export default Account;
