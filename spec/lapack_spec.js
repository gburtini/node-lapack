
var lapack = require('lib/node-lapack');
var approxEql = require('./approxEql');

describe('lapack', function() {
    var M = [
        [2, 1, 1],
        [1, 1, 1],
        [1, 1, 3]
    ];

    it('should lu', function() {
	var luIn = [
	    [ 4, 2, 1, 4],
	    [-9, 4, 3, 9],
	    [11, 3, 11, 3],
	    [-4, 5, 3, 1]
	];

	var result = lapack.sgetrf(luIn);
    });

    it('shoud sgeqrf', function() {
	var qr = lapack.sgeqrf(M);

	expect(approxEql(qr.R, 
			 [ [ -2.4494898319244385,
			     -1.632993221282959,
			     -2.4494895935058594 ],
			   [ 0.22474488615989685,
			     -0.5773501992225647,
			     -1.732050895690918 ],
			   [ 0.22474488615989685,
			     0.41421353816986084,
			     1.4142135381698608 ] ])).toBeTruthy();
    });

    it('should qr', function() {
	var qr = lapack.qr(M);
	expect(approxEql(qr.R, [
	    [ -2.4494898319244385, -1.632993221282959, -2.4494895935058594 ],
	    [ 0, -0.5773501992225647, -1.732050895690918 ],
	    [ 0,  0, 1.4142135381698608 ]
	])).toBeTruthy();
	expect(approxEql(qr.Q, [
	    [-8.16496580927726e-01,   5.77350269189626e-01,   5.04179082074709e-17],
	    [-4.08248290463863e-01,  -5.77350269189626e-01,  -7.07106781186548e-01],
	    [-4.08248290463863e-01,  -5.77350269189626e-01,   7.07106781186547e-01]
	]));
    });

    it('should sgesvd', function() {
        var svd = lapack.sgesvd('A', 'A', M);
	
	expect(approxEql(svd.S, [ [ 4.214320182800293, 0, 2.462372871899283e-38 ],
				  [ 1.4608111381530762,
				    2.4612226861197653e-38,
				    1.401298464324817e-45 ],
				  [ 0.3248690962791443,
				    1.401298464324817e-45,
				    2.462375113976826e-38 ] 
				]));

	expect(approxEql(svd.U, [ [ -0.5206573009490967,
				    0.7392387390136719,
				    0.4271322190761566 ],
				  [ -0.39711257815361023,
				    0.23319198191165924,
				    -0.8876503705978394 ],
				  [ -0.7557893991470337,
				    -0.631781280040741,
				    0.1721479445695877 ] ]));

	expect(approxEql(svd.VT, [ [ -0.5206573605537415,
				     -0.3971126079559326,
				     -0.7557893991470337 ],
				   [ 0.7392386794090271,
				     0.23319187760353088,
				     -0.631781280040741 ],
				   [ 0.42713218927383423,
				     -0.8876502513885498,
				     0.1721479296684265 ] ]));
    });
});

