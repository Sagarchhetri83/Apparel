const fetch = require('node-fetch');

async function testParams() {
    try {
        console.log('--- TEST 1: No Params ---');
        const r1 = await fetch('http://localhost:4000/products');
        const d1 = await r1.json();
        console.log('Status:', r1.status);
        console.log('Count:', d1.data ? d1.data.length : 'No data');
        if (d1.data && d1.data.length > 0) console.log('First Item:', d1.data[0]);

        console.log('\n--- TEST 2: Admin Param ---');
        const r2 = await fetch('http://localhost:4000/products?admin=true');
        const d2 = await r2.json();
        console.log('Status:', r2.status);
        console.log('Count:', d2.data ? d2.data.length : 'No data');

    } catch (e) {
        console.log('Error:', e.message);
    }
}

testParams();
