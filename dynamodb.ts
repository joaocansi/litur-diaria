import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

const ddb = new dynamoose.aws.ddb.DynamoDB({
	"credentials": {
		"accessKeyId": process.env.AWS_ACCESS_KEY_ID!,
		"secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY!,
	},
	"region": process.env.AWS_REGION!,
});

dynamoose.aws.ddb.set(ddb);

class PaymentType extends Item {
    customerId!: string;
    email!: string;
    status!: string;
}

export const Payment = dynamoose.model<PaymentType>('Payment', {
    customerId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        hashKey: true
    },
    status: {
        type: String,
        required: true,
    },
});

export const PaymentTable = new dynamoose.Table('Payment', [Payment], {
    prefix: 'liturgia_'
});
