const {faker} = require("@faker-js/faker");
const fs = require('fs');
const path = require('path');

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        country: faker.address.country(),
        company: faker.company.companyName(),
        jobTitle: faker.name.jobTitle(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
    });
    }

fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2));
