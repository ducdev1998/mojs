(function() {
  var Burst, Swirl, Transit;

  Transit = mojs.Transit;

  Swirl = mojs.Swirl;

  Burst = mojs.Burst;

  describe('Burst ->', function() {
    describe('extension ->', function() {
      it('should extend Transit class', function() {
        var burst;
        burst = new Burst;
        return expect(burst instanceof Transit).toBe(true);
      });
      return it('should have its own defaults', function() {
        var burst;
        burst = new Burst;
        expect(burst.defaults.degree).toBe(360);
        expect(burst.defaults.points).toBe(5);
        return expect(burst.defaults.type).toBe('circle');
      });
    });
    describe('pure tween props ->', function() {
      return it('should be a map of tween related options ->', function() {
        var burst;
        burst = new Burst;
        expect(burst.priorityOptionMap.duration).toBe(1);
        expect(burst.priorityOptionMap.delay).toBe(1);
        expect(burst.priorityOptionMap.repeat).toBe(1);
        expect(burst.priorityOptionMap.easing).toBe(1);
        expect(burst.priorityOptionMap.yoyo).toBe(1);
        expect(burst.priorityOptionMap.swirlSize).toBe(1);
        expect(burst.priorityOptionMap.swirlFrequency).toBe(1);
        expect(burst.priorityOptionMap.isSwirl).toBe(1);
        expect(burst.priorityOptionMap.fill).toBe(1);
        expect(burst.priorityOptionMap.stroke).toBe(1);
        expect(burst.priorityOptionMap.strokeWidth).toBe(1);
        expect(burst.priorityOptionMap.type).toBe(1);
        return expect(Object.keys(burst.priorityOptionMap).length).toBe(12);
      });
    });
    describe('initialization ->', function() {
      it('should create transits', function() {
        var burst;
        burst = new Burst;
        expect(burst.transits.length).toBe(5);
        return expect(burst.transits[0] instanceof Swirl).toBe(true);
      });
      it('should pass properties to transits', function() {
        var burst;
        burst = new Burst({
          swirlSize: 20,
          swirlFrequency: 'rand(10,20)',
          type: 'rect',
          stroke: 'red',
          strokeWidth: {
            10: 0
          },
          fill: 'deeppink',
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ],
            stroke: ['deeppink', 'yellow', null],
            strokeWidth: [null, null, 20],
            fill: ['#fff', null],
            type: ['circle', null, 'polygon'],
            swirlSize: [10, null],
            swirlFrequency: [null, 3]
          }
        });
        expect(burst.transits[0].o.radius[20]).toBe(50);
        expect(burst.transits[1].o.radius).toBe(20);
        expect(burst.transits[2].o.radius).toBe('500');
        expect(burst.transits[3].o.radius[20]).toBe(50);
        expect(burst.transits[4].o.radius).toBe(20);
        expect(burst.transits[1].o.stroke).toBe('yellow');
        expect(burst.transits[2].o.stroke).toBe('red');
        expect(burst.transits[3].o.stroke).toBe('deeppink');
        expect(burst.transits[3].o.strokeWidth[10]).toBe(0);
        expect(burst.transits[1].o.strokeWidth[10]).toBe(0);
        expect(burst.transits[2].o.strokeWidth).toBe(20);
        expect(burst.transits[0].o.fill).toBe('#fff');
        expect(burst.transits[1].o.fill).toBe('deeppink');
        expect(burst.transits[0].o.isSwirlLess).toBe(true);
        expect(burst.transits[0].o.swirlSize).toBe(10);
        expect(burst.transits[1].o.swirlSize).toBe(20);
        expect(burst.transits[0].o.swirlFrequency).toBe('rand(10,20)');
        expect(burst.transits[1].o.swirlFrequency).toBe(3);
        expect(burst.transits[0].o.type).toBe('circle');
        expect(burst.transits[1].o.type).toBe('rect');
        return expect(burst.transits[2].o.type).toBe('polygon');
      });
      it('should pass properties to transits #2: priorityOptionMap', function() {
        var burst;
        burst = new Burst({
          duration: 1000,
          swirlSize: 20,
          swirlFrequency: 'rand(10,20)',
          childOptions: {
            swirlSize: [5, 10, null, 7],
            fill: '#fff',
            duration: [100, null, null]
          }
        });
        expect(burst.transits[0].o.swirlSize).toBe(5);
        expect(burst.transits[2].o.swirlSize).toBe(20);
        expect(burst.transits[0].o.duration).toBe(100);
        expect(burst.transits[1].o.duration).toBe(1000);
        expect(burst.transits[2].o.duration).toBe(1000);
        return expect(burst.transits[3].o.duration).toBe(100);
      });
      return it('should pass x/y to transits', function() {
        var burst, center;
        burst = new Burst({
          radius: {
            50: 75
          },
          points: 2
        });
        center = burst.props.center;
        expect(burst.transits[0].o.x[center]).toBe(center);
        expect(burst.transits[0].o.y[center - 50]).toBe(center - 75);
        expect(burst.transits[1].o.x[center]).toBe(center);
        return expect(burst.transits[1].o.y[center + 50]).toBe(center + 75);
      });
    });
    describe('fillTransform method ->', function() {
      return it('return tranform string of the el', function() {
        var burst;
        burst = new Burst({
          shiftX: 100,
          shiftY: 100,
          angle: 50
        });
        return expect(burst.fillTransform()).toBe('rotate(50deg) translate(100px, 100px)');
      });
    });
    describe('isNeedsTransform method ->', function() {
      return it('return boolean if fillTransform needed', function() {
        var burst;
        burst = new Burst({
          shiftX: 100,
          shiftY: 100,
          angle: 50
        });
        return expect(burst.isNeedsTransform()).toBe(true);
      });
    });
    describe('childOptions ->', function() {
      it('should save childOptions from options ->', function() {
        var burst;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        expect(burst.childOptions).toBeDefined();
        return expect(burst.childOptions.radius[1]).toBe(20);
      });
      return it('should extend childDefaults ->', function() {
        var burst;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        return expect(burst.childOptions.strokeWidth[2]).toBe(0);
      });
    });
    describe('getOption method ->', function() {
      return it('should return an option obj based on i ->', function() {
        var burst, option0, option1, option7;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        option0 = burst.getOption(0);
        option1 = burst.getOption(1);
        option7 = burst.getOption(7);
        expect(option0.radius[20]).toBe(50);
        expect(option1.radius).toBe(20);
        return expect(option7.radius).toBe(20);
      });
    });
    describe('randomness ->', function() {
      describe('random angle ->', function() {
        it('should have randomAngle option ->', function() {
          var burst;
          burst = new Burst;
          expect(burst.props.randomAngle).toBeDefined();
          return expect(burst.props.randomAngle).toBe(0);
        });
        return it('should calculate angleRand for every transit ->', function() {
          var burst;
          burst = new Burst({
            randomAngle: true
          });
          expect(burst.transits[0].o.angleShift).toBeDefined();
          return expect(burst.transits[1].o.angleShift).toBeDefined();
        });
      });
      return describe('random radius ->', function() {
        it('should have randomRadius option ->', function() {
          var burst;
          burst = new Burst;
          expect(burst.props.randomRadius).toBeDefined();
          return expect(burst.props.randomRadius).toBe(0);
        });
        return it('should calculate radiusRand for every transit ->', function() {
          var burst;
          burst = new Burst({
            randomRadius: true
          });
          expect(burst.transits[0].o.radiusScale).toBeDefined();
          return expect(burst.transits[1].o.radiusScale).toBeDefined();
        });
      });
    });
    describe('getPropByMod method ->', function() {
      it('should return the prop from @o based on i ->', function() {
        var burst, opt0, opt1, opt2, opt8;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        opt0 = burst.getPropByMod({
          propName: 'radius',
          i: 0
        });
        opt1 = burst.getPropByMod({
          propName: 'radius',
          i: 1
        });
        opt2 = burst.getPropByMod({
          propName: 'radius',
          i: 2
        });
        opt8 = burst.getPropByMod({
          propName: 'radius',
          i: 8
        });
        expect(opt0[20]).toBe(50);
        expect(opt1).toBe(20);
        expect(opt2).toBe('500');
        return expect(opt8).toBe('500');
      });
      it('should the same prop if not an array ->', function() {
        var burst, opt0, opt1, opt8;
        burst = new Burst({
          childOptions: {
            radius: 20
          }
        });
        opt0 = burst.getPropByMod({
          propName: 'radius',
          i: 0
        });
        opt1 = burst.getPropByMod({
          propName: 'radius',
          i: 1
        });
        opt8 = burst.getPropByMod({
          propName: 'radius',
          i: 8
        });
        expect(opt0).toBe(20);
        expect(opt1).toBe(20);
        return expect(opt8).toBe(20);
      });
      return it('should work with another options object ->', function() {
        var burst, opt0, opt1, opt8;
        burst = new Burst({
          radius: 40,
          childOptions: {
            radius: 20
          }
        });
        opt0 = burst.getPropByMod({
          propName: 'radius',
          i: 0,
          from: 'o'
        });
        opt1 = burst.getPropByMod({
          propName: 'radius',
          i: 1,
          from: 'o'
        });
        opt8 = burst.getPropByMod({
          propName: 'radius',
          i: 8,
          from: 'o'
        });
        expect(opt0).toBe(40);
        expect(opt1).toBe(40);
        return expect(opt8).toBe(40);
      });
    });
    describe('size calculations calcSize method ->', function() {
      it('should calculate size based on largest transit + self radius', function() {
        var burst;
        burst = new Burst({
          radius: 50,
          childOptions: {
            radius: [
              {
                20: 50
              }, 20
            ],
            strokeWidth: 20
          }
        });
        expect(burst.props.size).toBe(240);
        return expect(burst.props.center).toBe(120);
      });
      it('should calculate size based on largest transit + self radius #2', function() {
        var burst;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20
            ],
            strokeWidth: 20
          }
        });
        expect(burst.props.size).toBe(290);
        return expect(burst.props.center).toBe(145);
      });
      it('should call the calcSize of every transit', function() {
        var burst;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20
            ],
            strokeWidth: 20
          }
        });
        spyOn(burst.transits[0], 'calcSize');
        spyOn(burst.transits[1], 'calcSize');
        burst.calcSize();
        expect(burst.transits[0].calcSize).toHaveBeenCalled();
        return expect(burst.transits[1].calcSize).toHaveBeenCalled();
      });
      return it('should call addBitOptions method', function() {
        var burst;
        burst = new Burst;
        spyOn(burst, 'addBitOptions');
        burst.calcSize();
        return expect(burst.addBitOptions).toHaveBeenCalled();
      });
    });
    describe('addBitOptions ->', function() {
      it('should set x/y on every transit', function() {
        var burst;
        burst = new Burst({
          radius: {
            0: 120
          }
        });
        return expect(burst.transits[1].o.x[129].toFixed(2)).toBe('243.13');
      });
      return it('should work if end radius is 0', function() {
        var burst, keys, x;
        burst = new Burst({
          radius: {
            120: 0
          }
        });
        x = burst.transits[1].o.x;
        keys = Object.keys(x);
        return expect(x[keys[0]] + '').not.toBe(keys[0]);
      });
    });
    describe('createTween method ->', function() {
      it('should create tween', function() {
        var burst;
        burst = new Burst;
        return expect(burst.tween).toBeDefined();
      });
      it('should add timelines to tween', function() {
        var burst;
        burst = new Burst;
        return expect(burst.tween.timelines.length).toBe(5);
      });
      it('should call startTween method', function() {
        var burst;
        burst = new Burst;
        spyOn(burst, 'startTween');
        burst.createTween();
        return expect(burst.startTween).toHaveBeenCalled();
      });
      return it('should not call startTween method if isRunLess', function() {
        var burst;
        burst = new Burst({
          isRunLess: true
        });
        spyOn(burst, 'startTween');
        burst.createTween();
        return expect(burst.startTween).not.toHaveBeenCalled();
      });
    });
    describe('onStart callback ->', function() {
      it('should run onStart callback', function() {
        var burst;
        burst = new Burst({
          isRunLess: true,
          onStart: function() {}
        });
        spyOn(burst.o, 'onStart');
        burst.run();
        return expect(burst.o.onStart).toHaveBeenCalled();
      });
      return it('should have the scope of burst', function() {
        var burst, isRightScope;
        isRightScope = false;
        burst = new Burst({
          onStart: function() {
            return isRightScope = this instanceof Burst;
          }
        });
        return expect(isRightScope).toBe(true);
      });
    });
    describe('onComplete callback ->', function() {
      it('should run onComplete callback', function(dfr) {
        var burst;
        burst = new Burst({
          isRunLess: true,
          duration: 20,
          onComplete: function() {}
        });
        spyOn(burst.o, 'onComplete');
        burst.run();
        return setTimeout(function() {
          expect(burst.o.onComplete).toHaveBeenCalled();
          return dfr();
        }, 100);
      });
      return it('should have the scope of burst', function(dfr) {
        var burst, isRightScope;
        isRightScope = false;
        burst = new Burst({
          duration: 20,
          onComplete: function() {
            return isRightScope = this instanceof Burst;
          }
        });
        burst.run();
        return setTimeout((function() {
          expect(isRightScope).toBe(true);
          return dfr();
        }), 100);
      });
    });
    describe('onUpdate callback ->', function() {
      it('should run onUpdate callback', function(dfr) {
        var burst;
        burst = new Burst({
          isRunLess: true,
          duration: 20,
          isIt: true,
          onUpdate: function() {}
        });
        spyOn(burst.o, 'onUpdate');
        burst.run();
        return setTimeout(function() {
          expect(burst.o.onUpdate).toHaveBeenCalledWith(1);
          return dfr();
        }, 100);
      });
      return it('should have the scope of burst', function(dfr) {
        var burst, isRightScope;
        isRightScope = false;
        burst = new Burst({
          duration: 20,
          onUpdate: function() {
            return isRightScope = this instanceof Burst;
          }
        });
        burst.run();
        return setTimeout((function() {
          expect(isRightScope).toBe(true);
          return dfr();
        }), 100);
      });
    });
    describe('run method ->', function() {
      it('should call super', function() {
        var burst;
        burst = new Burst({
          radius: {
            20: 50
          }
        });
        spyOn(Burst.__super__, 'run');
        burst.run();
        return expect(Burst.__super__.run).toHaveBeenCalled();
      });
      it('should call generateRandomAngle method if randomAngle was passed', function() {
        var burst;
        burst = new Burst({
          randomAngle: true
        });
        spyOn(burst, 'generateRandomAngle');
        burst.run();
        return expect(burst.generateRandomAngle).toHaveBeenCalled();
      });
      it('should not call generateRandomAngle method', function() {
        var burst;
        burst = new Burst({
          randomAngle: false
        });
        spyOn(burst, 'generateRandomAngle');
        burst.run();
        return expect(burst.generateRandomAngle).not.toHaveBeenCalled();
      });
      it('should call generateRandomRadius method if randomAngle was passed', function() {
        var burst;
        burst = new Burst({
          randomRadius: true
        });
        spyOn(burst, 'generateRandomRadius');
        burst.run();
        return expect(burst.generateRandomRadius).toHaveBeenCalled();
      });
      return it('should not call generateRandomRadius method', function() {
        var burst;
        burst = new Burst({
          randomRadius: false
        });
        spyOn(burst, 'generateRandomRadius');
        burst.run();
        return expect(burst.generateRandomRadius).not.toHaveBeenCalled();
      });
    });
    describe('generateRandomAngle method ->', function() {
      return it('should generate random angle based on randomness', function() {
        var angle, burst;
        burst = new Burst({
          randomAngle: .75
        });
        angle = burst.generateRandomAngle();
        expect(angle).toBeGreaterThan(45);
        return expect(angle).not.toBeGreaterThan(315);
      });
    });
    describe('generateRandomRadius method ->', function() {
      return it('should generate random radius based on randomness', function() {
        var burst, radius;
        burst = new Burst({
          randomRadius: .75
        });
        radius = burst.generateRandomRadius();
        expect(radius).toBeGreaterThan(.24);
        return expect(radius).not.toBeGreaterThan(1);
      });
    });
    return describe('draw method ->', function() {
      it('should not call drawEl method', function() {
        var burst;
        burst = new Burst;
        spyOn(burst, 'drawEl');
        burst.draw();
        return expect(burst.drawEl).toHaveBeenCalled();
      });
      return it('should call fillTransform method', function() {
        var burst;
        burst = new Burst({
          radius: 25
        });
        spyOn(burst, 'fillTransform');
        burst.draw();
        return expect(burst.fillTransform).toHaveBeenCalled();
      });
    });
  });

}).call(this);
